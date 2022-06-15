import { Router } from 'express';

const router = Router();



router.get('/',(_req,res:any)=>{
    res.send('Products')
})

router.get('/:id',(req,res)=>{
    const id = req.params.id
    res.send('Product ' + id)
})

router.post('/',(_req,res)=>{
    res.send('Product posted')
})

router.put('/',(_req,res)=>{
    res.send('Product update')
})


module.exports = router;