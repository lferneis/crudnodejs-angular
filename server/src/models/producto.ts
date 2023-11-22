import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Categoria from './categoria';

const Producto = db.define('Producto', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false,
    updatedAt: false
});


export default Producto;