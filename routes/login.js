const express = require('express');
const Joi = require('joi');
const router = express.Router();



router.get('/user', (req , res)=> {
    const schema = Joi.object({
        userName : Joi.string().required(),
        password: Joi.string().required()
    });

    const {error , value } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    else {
        res.send('welocome to login');
    }
   
})

module.exports = router;