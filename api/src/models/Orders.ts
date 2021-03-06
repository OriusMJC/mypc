import { DataTypes } from 'sequelize';
// const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize:any) => {
  sequelize.define('Order', {
    id: {
      type: DataTypes.STRING,
      allownull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.STRING,
      allownull: false,
      // validate:{
      //   isDate: true,/* "2022-06-23" */
      // },
      defaultValue: DataTypes.DATE
    },
    address: {
      type: DataTypes.STRING,
      allownull: false,
    },
    product: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allownull: false
    },
    fullPayment: {
      type: DataTypes.FLOAT,
      allownull: false,
    },
    typeOfPayment: {
      type: DataTypes.ENUM('efectivo', 'credit', 'debit', 'pagoFacil', 'rapiPago', 'mercadoPago', 'cuotas', 'transferencia', 'deposito'),
      allownull: false,
    },
    statusOfPayment: {
      type: DataTypes.ENUM('pendiente', 'pagado'),
      allownull: false,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'correo', 'entregado'),
      /* 
      Pendiente: el vendedor todavia tiene los productos
      Correo: los productos ya estan en manos del correo
      Entregado: el comprador recibio el pedido
      */
      allownull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // seller: {
    //   type: DataTypes.JSON,
    // }
    },{
    timestamps: false
  });
};