const express = require('express');
const conn = require('../services/DbConnection');
const Joi = require('joi');
const router = express.Router();

router.get('/:chatId', (req , res)=> {
    console.log("ok");
    const schema = {
        chatId: Joi.number().required()
    };
    console.log(req.params);
    // const {error , value } = Joi.validate(req.params, schema);
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return null;
    // }
    const query = 'select hashstring from chat where chatId = ?';

    conn.query(query,[req.params.chatId] ,(err , rows )=> {
        if(!err){
            console.log('db data' + rows);

            res.send(rows);
        }
        else {
            console.log('err' + err);
        }
    });
})

module.exports = router;