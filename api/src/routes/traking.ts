import { Router } from 'express'
const { Tracking } = require("../traking/tracking");
const apiKey = 'ex9hemv0-dpdo-24ws-gowv-6ipp0irggcuw';
const tracker = new Tracking(apiKey);
let router = Router();

let post_data = [
  {"tracking_number": "YT2205421266056615", "courier_code": "yunexpress"},
  {"tracking_number": "303662548678", "courier_code": "qichen"}
];

let getData = async (url:any, data:any, method:any) => {
    let res = await tracker.doRequest(url, data, method);
  return res;
}

router.get("/get", async (_req:any, res:any) => {
  let data = "get?tracking_numbers=UB209300714LB";
  let resp = await getData(data, null, null);
  res.send(resp)
})
router.get("/", async (_req:any, res:any) => {
  let resp = await getData('create', post_data, 'POST')
  res.send(resp)
})
router.post("/", async (req:any, res:any) => {
  let data = req.body;
  let resp = await getData("create",data,"POST")
  res.send(resp)
})

module.exports = router