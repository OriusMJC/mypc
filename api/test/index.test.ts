// import jest from 'jest'
const appTest = require('../src/app')
const supertest = require('supertest')
const api = supertest(appTest)

describe('GET /users',()=>{
    test('should respond with a 200 status code',async ()=>{
        // const response = await request(appTest).get('/users').send()
        // expect(response.statusCode).toBe(200)
        api
            .get('/users')
            .expect(200)
    })
    test('should respond with an Array',async ()=>{
        const response = await api.get('/users').send()
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /users',()=>{
    xtest('should respond with a 200 status code and a msg',async ()=>{
        const user = {
          "id":String(Math.random()*100),
          "name":"Oriusita",
          "email":"matias@gmail.com",
          "password":"orius12345",
          "phone":1112345678,
          "avatar":"https://i.pravatar.cc/150?u=matias",
          "noti":[],
          "fav": [],
          "buy": []
        }
        await api
            .post('/users')
            .send(user)
            .expect(200)
            .expect("Usuario guardado con éxito")
        // console.log(response)
    })
    test('should respond with a 404 status code and a msg Error',async ()=>{
        //user without key "name".
        const user = {
          "id":String(Math.random()*100),
          "email":"matias@gmail.com",
          "password":"orius12345",
          "phone":1112345678,
          "avatar":"https://i.pravatar.cc/150?u=matias",
          "noti":[],
          "fav": [],
          "buy": []
        }
        await api
            .post('/users')
            .send(user)
            .expect(404)
            .expect({"errors":[{"msg":"Ingrese un nombre de usuario","param":"name","location":"body"}]})
    })
})


describe('GET /products',()=>{
    test('should respond with a 200 status code',async ()=>{
        // const response = await request(appTest).get('/users').send()
        // expect(response.statusCode).toBe(200)
        api
            .get('/products')
            .expect(200)
    })
    test('should respond with an Array',async ()=>{
        const response = await api.get('/products').send()
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /products',()=>{
    test('should respond with a 200 status code and a msg',async ()=>{
        const product = {
            "title" : "PC Gamer",
            "photo": ["https://mla-s1-p.mlstatic.com/733026-MLA49762406952_042022-F.jpg"],
            "price": 150000,
            "type": "full",
            "description": "Gtx 1060, Ryzen 5 2600, 16 Ram. Puedes jugar a todos los últimos títulos con esta gran PC GAMER!!!",
            "likes": 0,
            "stockInitial": 15,
            "comments": [],
            "status": "nuevo"
        }
        await api
            .post('/products/2')
            .send(product)
            .expect(200)
            .expect('"Producto creado con éxito"')
        // console.log(response)
    })
    test('should respond with a 404 status code and a msg Error',async ()=>{
        //user without key "title".
        const product = {
            "photo": ["https://mla-s1-p.mlstatic.com/733026-MLA49762406952_042022-F.jpg"],
            "price": 150000,
            "type": "full",
            "description": "Gtx 1060, Ryzen 5 2600, 16 Ram. Puedes jugar a todos los últimos títulos con esta gran PC GAMER!!!",
            "likes": 0,
            "stockInitial": 15,
            "comments": [],
            "status": "nuevo"
        }
        await api
            .post('/products/2')
            .send(product)
            .expect(404)
            .expect({"errors":[{ "msg": "Ingrese un titulo", "param": "title", "location": "body" }]})
    })
})