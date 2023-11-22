import { Request, Response } from 'express';
import Categoria from '../models/categoria';
import Producto from '../models/producto';

export const getCategories = async (req: Request, res: Response) => {
    const listCategories = await Categoria.findAll({
        include:
        {
            model: Producto
        },
    });

    res.json(listCategories)
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Categoria.findOne({
        where: {id},
        include: 
            {
                model: Producto
            },
    });

    if (category) {
        res.json(category)
    } else {
        res.status(404).json({
            msg: `No existe la Categoria con el id ${id}`
        })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Categoria.findByPk(id);

    if (!category) {
        res.status(404).json({
            msg: `No existe la Categoria con el id ${id}`
        })
    } else {
        await category.destroy();
        res.json({
            msg: 'La categoria fue eliminado con exito!'
        })
    }

}

export const postCategory = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Categoria.create(body);

        res.json({
            msg: `La categoria fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const category = await Categoria.findByPk(id);

    if(category) {
        await category.update(body);
        res.json({
            msg: 'La categoria fue actualizado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe la categoria con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}