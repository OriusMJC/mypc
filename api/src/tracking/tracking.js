class Tracking {
    http = require('http')
    https = require('https')
    qs = require('querystring')
    apiVersion = "v3"
    basePath = "https://api.trackingmore.com/"
    apiKey = "Your api key"

    constructor(apiKey) {
        this.apiKey = apiKey
    }

    getReqType(url) {
        return url.startsWith('https://') ? this.https : this.http
    }

    getReq(url, params, options = {}) {
        return new Promise((resolve, reject) => {
            let request = this.getReqType(url)
            let keys = Object.keys(params)
            url = keys.length ? (url + (url.indexOf('?') > -1 ? '&' : '?') + this.qs.stringify(params).replace(/\?$/g, '')) : url
            options.headers = options.headers ? options.headers['content-type'] ? options.headers : {
                ...options.headers,
                'Tracking-Api-Key': this.apiKey,
                'content-type': 'application/json',
                'rejectUnauthorized':false
            } : {
                'Tracking-Api-Key': this.apiKey,
                'content-type': 'application/json',
                'rejectUnauthorized':false
            }
            request.get(url, options, res => {
                var data = ''
                res.on('data', (chunk) => {
                    data += chunk;
                })
                res.on('end', () => {
                    resolve(data)
                })
            }).on('error', err => {
                reject(err)
            })
        })
    }

    postReq(url, content, method = '',options = {})  {
        return new Promise((resolve, reject) => {
            let request = this.getReqType(url)
            options.headers = options.headers ? options.headers['content-type'] ? options.headers : {
                ...options.headers,
                'Tracking-Api-Key': this.apiKey,
                'content-type': 'application/json',
                'rejectUnauthorized':false
            } : {
                'Tracking-Api-Key': this.apiKey,
                'content-type': 'application/json',
                'rejectUnauthorized':false
            }
            options.headers['Content-Length'] = Buffer.byteLength(content, 'utf8')
            let req = request.request(url, {
                ...options,
                method: method,
            }, res => {
                res.setEncoding('utf8');
                var data = ''
                res.on('data', (chunk) => {
                    data += chunk
                })
                res.on('end', () => {
                    resolve(data)
                })
            }).on('error', err => {
                reject(err)
            })
            req.write(content)
            req.end()
        })
    }

    async jsonp(url, params) {
        let callback = '_cb'
        if (params.callback) {
            callback = params.callback
        }
        let res
        const data = await this.getReq(url, {
            ...params,
            callback
        })
        eval(`function ${callback}(data) {
            res = data
        }   ` + data)
        return res
    }

    async doRequest(path, data = '', method = 'GET') {
        const url = this.basePath+'/'+this.apiVersion+'/trackings/'+path
        method = method.toUpperCase()
        if (method==='GET') {
            return this.getReq(url, data);
        }else{
            if(data===null){
                data=this.qs.stringify(data);
            }else{
                data = JSON.stringify(data); //json format
            }
            return this.postReq(url, data,method);
        }
    }
}

module.exports = {Tracking}





























// class Tracking {
//     http = require('http')
//     https = require('https')
//     qs = require('querystring')
//     apiVersion = "v3"
//     basePath = "https://api.trackingmore.com/"
//     apiKey = "Your api key"

//     constructor(apiKey:any) {
//         this.apiKey = apiKey
//     }

//     getReqType(url:any) {
//         return url.startsWith('https://') ? this.https : this.http
//     }

//     getReq(url:any, params:any, options:any) {
//         return new Promise((resolve, reject) => {
//             let request = this.getReqType(url)
//             let keys = Object.keys(params)
//             url = keys.length ? (url + (url.indexOf('?') > -1 ? '&' : '?') + this.qs.stringify(params).replace(/\?$/g, '')) : url
//             options.headers = options.headers ? options.headers['content-type'] ? options.headers : {
//                 ...options.headers,
//                 'Tracking-Api-Key': this.apiKey,
//                 'content-type': 'application/json',
//                 'rejectUnauthorized':false
//             } : {
//                 'Tracking-Api-Key': this.apiKey,
//                 'content-type': 'application/json',
//                 'rejectUnauthorized':false
//             }
//             request.get(url, options, (res:any) => {
//                 var data = ''
//                 res.on('data', (chunk:any) => {
//                     data += chunk;
//                 })
//                 res.on('end', () => {
//                     resolve(data)
//                 })
//             }).on('error', (err:any) => {
//                 reject(err)
//             })
//         })
//     }

//     postReq(url:any, content:any, method = '',options:any)  {
//         return new Promise((resolve, reject) => {
//             let request = this.getReqType(url)
//             options.headers = options.headers ? options.headers['content-type'] ? options.headers : {
//                 ...options.headers,
//                 'Tracking-Api-Key': this.apiKey,
//                 'content-type': 'application/json',
//                 'rejectUnauthorized':false
//             } : {
//                 'Tracking-Api-Key': this.apiKey,
//                 'content-type': 'application/json',
//                 'rejectUnauthorized':false
//             }
//             options.headers['Content-Length'] = Buffer.byteLength(content, 'utf8')
//             let req = request.request(url, {
//                 ...options,
//                 method: method,
//             }, (res:any) => {
//                 res.setEncoding('utf8');
//                 var data = ''
//                 res.on('data', (chunk:any) => {
//                     data += chunk
//                 })
//                 res.on('end', () => {
//                     resolve(data)
//                 })
//             }).on('error', (err:any) => {
//                 reject(err)
//             })
//             req.write(content)
//             req.end()
//         })
//     }

//     async jsonp(url:any, params:any) {
//         let callback = '_cb'
//         if (params.callback) {
//             callback = params.callback
//         }
//         let res
//         const data = await this.getReq(url, {
//             ...params,
//             callback
//         })
//         eval(`function ${callback}(data) {
//             res = data
//         }   ` + data)
//         return res
//     }

//     async doRequest(path, data = '', method = 'GET') {
//         const url = this.basePath+'/'+this.apiVersion+'/trackings/'+path
//         method = method.toUpperCase()
//         if (method==='GET') {
//             return this.getReq(url, data);
//         }else{
//             if(data===null){
//                 data=this.qs.stringify(data);
//             }else{
//                 data = JSON.stringify(data); //json format
//             }
//             return this.postReq(url, data,method);
//         }
//     }
// }

// module.exports = {Tracking}
