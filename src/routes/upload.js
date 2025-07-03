const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    res.send("upload route is working");
})

router.get('/test', (req, res)=>{
    res.send("hello");
})



module.exports = router;