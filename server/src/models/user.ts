import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true, // O ajusta según tus necesidades
        defaultValue: 'Trafico' // Establece un valor predeterminado
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Establece un valor predeterminado
        
    }
    
}, )
/* User.sync() */