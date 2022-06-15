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