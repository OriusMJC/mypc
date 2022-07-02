// import * as types from "../types";
// import { Order } from '../db'
const { Order } = require("../db");

export const getAllOrders = async () => {
	let orders = await Order.findAll();
	// console.log(orders);
	return orders;
};
export const getUserOrders = async (id: string) => {
	let orders = await Order.findAll({ where: { "user": id } });
	return orders;
};
export const addOrder = async (amount: any, token: any, purchaseData: any) => {
	let dataOrder = {
		id: token.id,
		address: token.card.address_line1,
		product: purchaseData.listPrice,
		fullPayment: amount,
		typeOfPayment: token.card.funding,
		statusOfPayment: "pagado",
		status: "correo",
		user: purchaseData.user.id,
	};
	await Order.create(dataOrder);
	return "orden creada";
};