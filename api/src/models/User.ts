import { DataTypes } from 'sequelize';
// const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  sequelize.define('user', {
    //users
    id: {
      type: DataTypes.STRING,
      allownull: false,
      primaryKey: true
    },
    userName:{
      type: DataTypes.STRING(30),
      allownull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allownull: false,
      validate: {
        isAlpha: true,
        isAlphanumeric: false,
        isNumeric: false,
        len: [8,30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        isEmail: true,
        isLowercase: true,
      }
    },
    password: {
      type: DataTypes.STRING(20),
      allownull: false,
      validate: {
        isAlphanumeric: true,
        is: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
        len: [6,20]
      }
    },
    phone: { 
      type: DataTypes.STRING,
      allownull: false,
      validate: {
/* Con 0-15 son 13 numeros; sin 0-15 son 10 */
        min: 8,
        max:16
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allownull: false
    },
    fav: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    buy: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    },{
    timestamps: false
  });
};
