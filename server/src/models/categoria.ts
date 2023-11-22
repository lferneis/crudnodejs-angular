import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Producto from './producto';

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: DataTypes.STRING,
});

// Establecer la relación de pertenencia a una categoría
Categoria.hasMany(Producto,{
  foreignKey: "categoriaId",
  sourceKey: "id"
})

Producto.belongsTo(Categoria,{
  foreignKey: "categoriaId",
  targetKey: "id"
})

/* Categoria.sync()
Producto.sync() */

export default Categoria;
