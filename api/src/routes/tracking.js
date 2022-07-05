// import { Router } from 'express'
const express = require("express");
const router = express();
const { Tracking } = require("../tracking/tracking");
const apiKey = "ex9hemv0-dpdo-24ws-gowv-6ipp0irggcuw";
const tracker = new Tracking(apiKey);
// import { getUserById, updateDataUser } from "../services/usersServices";
const functionsUser = require("../services/usersServices")
// let router = Router();
let post_data = [
	{ tracking_number: "YT2205421266056615", courier_code: "yunexpress" },
	{ tracking_number: "303662548678", courier_code: "qichen" },
];

let getData = async (url, data, method) => {
	// let getData = async (url:any, data:any, method:any) => {
	let res = await tracker.doRequest(url, data, method);
	return res;
};

//============================
// SEGUIMIENTO DE ENVIO POR ID
//============================
router.get("/:id", async (req, res) => {
	let data = `get?tracking_numbers=${req.params.id}`;
	let resp = await getData(data);
	res.send(resp);
});

//================================
// CREAR TRACKING , datos por body
// {
//   "tracking_number": "UB209300S714LB",
//   "courier_code": "correo-argentino",
//   "order_number": "#1234",
//   "destination_code": "LV",
//   "logistics_channel": "4px channel",
//   "customer_name": "name test",
//   "customer_email": "example@abc.com",
//   "customer_phone": "+1123456789",
//   "note": "check",
//   "title": "title test",
//   "lang": "es"
// }
//================================
router.post("/:id", async (req, res) => {
  let test = [{"tracking_number":req.body.tracking_number,"courier_code":req.body.courier_code,"order_number":req.body.order_number,"destination_code":req.body.destination_code,"logistics_channel":req.body.logistics_channel,"customer_name":req.body.customer_name,"customer_email":req.body.customer_email,"customer_phone":req.body.customer_phone,"note":req.body.note,"title":req.body.title,"lang":req.body.lang}];
	
	let resp = JSON.parse(await getData("create", test, "POST"));
  // let holaa = JSON.parse(resp)
  if(!resp.data.error.length) {
    let dataUser = await functionsUser.getUserById(req.params.id);
    // let nroTracking = {...dataUser}
    // console.log("SEGUNDOOOOOOOOOOOOOOOOOOOOOOOOOOOO",nroTracking)
    dataUser.dataValues.tracking.unshift(resp.data.success.tracking_number);
    // dataUser.tracking.unshift(resp.data.success[0].tracking_number);
    // await dataUser.update(nroTracking)
    await functionsUser.updateDataUser(dataUser);
    res.send(["success"])
  } else {
    res.send([]);
  }
});

//============================
// PRUEBAS
//============================
// router.get("/", async (req, res) => {
// // router.get("/", async (_req:any, res:any) => {
//     let resp = await getData('create', post_data, 'POST')
//   res.send(resp)
// })

module.exports = router;
