import { Request, Response } from 'express';
import Producto from '../models/producto';
import Categoria from '../models/categoria';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Producto.findAll({
            include:
                {
                    model: Categoria
                },
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los productos.',
        });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Producto.findOne({
            where: {id},
            include: 
                {
                    model: Categoria
                },
        });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener el producto.',
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await product.destroy();
        res.json({
            msg: 'El producto fue eliminado con exito!'
        })
    }

};

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Producto.create(body);

        res.json({
            msg: `El producto fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const product = await Producto.findByPk(id);

    if(product) {
        await product.update(body);
        res.json({
            msg: 'El producto fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }    
}
/* 
import { Request, Response } from 'express';
import Producto from '../models/producto';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Producto.findAll()

    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await product.destroy();
        res.json({
            msg: 'El producto fue eliminado con exito!'
        })
    }

}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Producto.create(body);

        res.json({
            msg: `El producto fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const product = await Producto.findByPk(id);

    if(product) {
        await product.update(body);
        res.json({
            msg: 'El producto fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
} */