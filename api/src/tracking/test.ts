const {Tracking} = require("./tracking");
const apiKey = 'ex9hemv0-dpdo-24ws-gowv-6ipp0irggcuw';
const tracker = new Tracking(apiKey);

export async function getData(url:any, data:any, method:any) {
    let res = await tracker.doRequest(url, data, method);
    return res;
}

// let post_data = [
//     {"tracking_number": "YT2205421266056615", "courier_code": "yunexpress"},
//     {"tracking_number": "303662548678", "courier_code": "qichen"}
// ];

// create  tracking number
// getData('create', post_data, 'POST').then(res => {
//     console.log(res)
// });

// Get tracking results of a  tracking or List all trackings
// get = 'get?tracking_numbers=YT2205421266056615,303662548678'
// getData(get).then(res => {
//     console.log(res)
// })

//count
// count = 'count?created_date_min=1646064000&created_date_max=1648742400'
// getData(count).then(r => {
//     console.log(r)
// });

// Update Tracking item
// getData('modifyinfo', post_data, 'PUT').then(r => {
//     console.log(r)
// })

// // Delete tracking item
// getData('delete', post_data, 'DELETE').then(r => {
//     console.log(r)
// })
