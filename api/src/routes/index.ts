import { Router } from 'express';
const users = require('./users')
const products = require('./products')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/users',users)
router.use('/products',products)




module.exports = router;