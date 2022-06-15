import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  // defino el modelo
  sequelize.define('user', {
    //users
  },{
    timestamps: false
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