import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
    const { username, password, role, active } = req.body;

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ where: { username: username } });

    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Guardarmos usuario en la base de datos con el rol y estado
        await User.create({
            username: username,
            password: hashedPassword,
            role: role || 'Trafico', // Valor predeterminado si no se proporciona
            active: active || false, // Valor predeterminado si no se proporciona
        });

        res.json({
            msg: `Usuario ${username} creado exitosamente!`,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrió un error',
            error,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validamos si el usuario existe en la base de datos y está activo
    const user: any = await User.findOne({ where: { username: username, active: true } });

    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario activo con el nombre ${username} en la base de datos`,
        });
    }

    // Validamos password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`,
        });
    }

    // Ahora puedes acceder al rol y estado del usuario con user.role y user.active
    const token = jwt.sign(
        {
            username: username,
            role: user.role,
            active: user.active,
        },
        process.env.SECRET_KEY || 'pepito123'
    );

    res.json(token);
};

export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll()

    res.json(listUsers)
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        })
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            msg: `No existe el Usuario con el id ${id}`
        })
    } else {
        await user.destroy();
        res.json({
            msg: 'El usuario fue eliminado con exito!'
        })
    }

};

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await User.create(body);

        res.json({
            msg: `El usuario fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

    if(user) {
        await user.update(body);
        res.json({
            msg: 'El usuario fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}

