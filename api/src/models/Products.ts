import { DataTypes } from 'sequelize';
// const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allownull: false,
      validate: {
        len: [10,50],
        isAlphanumeric: true,
        notNull: true,
      }
    },
    photo: {
      type: DataTypes.STRING,
      allownull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allownull: false,
      validate: {
        isNumeric: true,
        isFloat: true,
        isAlpha: false,
        not: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
        notNull: true,
        min: 0.01,
        max: 999999.00,
      }
    },
    type: {
      type: DataTypes.ENUM('full', 'motherboar', 'procesador', 'grafica', 'ram', 'ssd', 'hdd', 'cooler', 'monitor', 'mouse', 'teclado', 'cables', 'fuente')
    },
    description: {
      type: DataTypes.TEXT,
      allownull: false,
      validate: {
        len:[10,500],
        notNull: true
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      }
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    status: {
      type: DataTypes.ENUM('nuevo', 'usado'),
      allownull: false
    },
    sell: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sellerInfo: {
      type: DataTypes.JSON,
    }
  },{
    timestamps: false
  });
};
