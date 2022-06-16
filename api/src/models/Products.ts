//import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  // defino el modelo
  sequelize.define('product', {
    //users
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
      serial: true,
    },
    tittle: {
      type: DataTypes.STRING(50),
      allownull: false
    },
    photo: {
      type: DataTypes.STRING,
      allownull: false
    },
    price: {
      type: DataTypes.NUMBER,
      allownull: false
    },
    type: {
      type: DataTypes.ENUM('full', 'motherboar', 'procesador', 'grafica', 'ram', 'ssd', 'hdd', 'cooler', 'monitor', 'mouse', 'teclado', 'cables', 'fuente')
    },
    description: {
      type: DataTypes.TEXT,
      allownull: false
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    comments: {
      type: DataTypes.ARRAY,
    },
    status: {
      type: DataTypes.ENUM('nuevo', 'usado'),
      allownull: false
    },
    sell: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    sellerInfo: {
      type: DataTypes.ARRAY,
    }
  },{
    timestamps: false
  });
};

// {
//   "id": "1",
//   "title" : "Procesador Ryzen 5",
//   "photo": "url",
//   "price": 200,
//   "type": "full | motherboard | procesador | grafica | ram | ssd | hdd | cooler | monitor | mouse | teclado | cables | fuente",
//   "description": "descripcion Ryzen 5",
//   "likes": 5,
//   "comments": [
//       {"name":"matias", "avatar": "https://i.pravatar.cc/150?u=matias","comment":"Te sirven 50?"}, 
//       {"name":"Carlitos", "avatar": "https://i.pravatar.cc/150?u=carlos","comment":"De que generacion es??"}
//       ],
//   "status": "Nuevo",
//   "sellerInfo": [{
//       "id": "1gv2g3v32g2hhd",
//       "name" : "Marcelo",
//       "email": "email@gmail.com",
//       "avatar": "https://i.pravatar.cc/150?u=marcelo"
//   }]
// }