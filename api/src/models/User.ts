import { DataTypes } from 'sequelize';
// const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  sequelize.define('User', {
    //users
    id: {
      type: DataTypes.STRING,
      allownull: false,
      primaryKey: true
    },
    admin:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING(30),
      allownull: false
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
      allownull: false
    },
    phone: { 
      type: DataTypes.STRING,
      allownull: false
    },
/*    country: { 
      type: DataTypes.STRING,
      allownull: false,
      validate:{
        isNumeric: false,
        isAlphanumeric: false,
        isAlpha: true,
      }
    },
    state: { 
      type: DataTypes.STRING,
      allownull: false,
      validate:{
        isNumeric: false,
        isAlphanumeric: false,
        isAlpha: true,
      }
    },
    city: { 
      type: DataTypes.STRING,
      allownull: false,
      validate:{
        isNumeric: false,
        isAlphanumeric: false,
        isAlpha: true,
      }
    },
    postalCode: { 
      type: DataTypes.STRING,
      allownull: false
    },
    address: { 
      type: DataTypes.STRING,
      allownull: false
    },
    cbu: { 
      type: DataTypes.NUMBER,
      validate:{
        min:22,
        max:22
      }
    },
    debitCard: { 
      type: DataTypes.ARRAY(DataTypes.JSON){venc. nombre. numero. codSeguridad}
    },
    creditCard: { 
      type: DataTypes.ARRAY(DataTypes.JSON){venc. nombre. numero. codSeguridad}
    },
    */    
    avatar: {
    type: DataTypes.STRING(5000),
    allownull: false
    },
    fav: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    buy: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    noti:{
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    visited: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    longitude: {
      type: DataTypes.STRING(500),
    },
    latitude: {
      type: DataTypes.STRING(500),
    },
    seller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
    },{
    timestamps: true
  });
};


// {
//   "id": "1gv2g3v32g2hhd",
//   "name" : "Marcelo",
//   "email": "email@gmail.com",
//   "password": "eldelasnenas12345",
//   "phone": "011 1234 9876",
//   "avatar": "https://i.pravatar.cc/150?u=marcelo",
//   "fav": [
//       {"id": "3","title" : "PC Geimer full free fire 4K HD","photo": "url","price": 150},
//       {"id": "3","title" : "PC Geimer full free fire 4K HD","photo": "url","price": 150}
//       ],
//   "buy": [
//       {"id": "3","title" : "PC Geimer full free fire 4K HD","photo": "url","price": 150},
//       {"id": "3","title" : "PC Geimer full free fire 4K HD","photo": "url","price": 150}
//       ],
//   "sell": [{
//       "id": "1",
//       "title" : "Procesador Ryzen 5",
//       "photo": "url",
//       "price": 200,
//       "description": "descripcion Ryzen 5",
//       "likes": 5,
//       "comments": [
//           {"name":"matias", "avatar": "https://i.pravatar.cc/150?u=matias","comment":"Te sirven 50?"}, 
//           {"name":"Carlitos", "avatar": "https://i.pravatar.cc/150?u=carlos","comment":"De que generacion es??"}
//           ],
//       "status": "Nuevo"
//       }
//   ]
// }