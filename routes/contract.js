const express = require('express');
const conn = require('../services/DbConnection');
const Joi = require('joi');
const router = express.Router();

router.get('/:type', (req , res)=> {
    console.log("ok");
    const schema = {
        type: Joi.number().required()
    };
    console.log(req.params);
    // const {error , value } = Joi.validate(req.params, schema);
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return null;
    // }
    const query = 'select hashstring from contracts where type = ?';

    conn.query(query,[req.params.type] ,(err , rows )=> {
        if(!err){
            console.log(rows);

            res.send(rows);
        }
        else {
            console.log('err' + err);
        }
    });
})

router.post('/', (req , res)=> {
       
    const hashstring = req.body.hashstring;
    const type = req.body.type;
    const schema = Joi.object({
        hashstring : Joi.string().required(),
        type: Joi.number().required()
    });

    const {error , value } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return null;
    }
    
    const query = 'insert into contracts (hashstring, type) values (? , ?)';
  
    conn.query(query,[hashstring,type],(err , rows )=> {
        if(!err){
            console.log(rows);

            res.status(200).send();

        }
        else {
            console.log('err' + err);
        }
    });
   
})

module.exports = router;