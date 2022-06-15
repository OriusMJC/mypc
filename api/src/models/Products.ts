import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  // defino el modelo
  sequelize.define('product', {
    //users
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