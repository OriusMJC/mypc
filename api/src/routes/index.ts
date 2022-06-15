import { Router } from 'express';
const users = require('./users')
const products = require('./products')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',(_req,res:any)=>{
    console.log('funciona')
    res.send('funcionando')
})


router.use('/users',users)
router.use('/products',products)




module.exports = router;