import { Router } from 'express';

const router = Router();



router.get('/',(_req,res:any)=>{
    res.send('users')
})
router.get('/:id',(req,res)=>{
    const id = req.params.id
    res.send('user ' + id)
})

router.post('/',(_req,res)=>{
    res.send('User posted')
})
router.put('/',(_req,res)=>{
    res.send('User update')
})





module.exports = router;