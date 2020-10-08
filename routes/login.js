const express = require('express');
const conn = require('../services/DbConnection');
const Joi = require('joi');
const router = express.Router();



router.post('/user', (req , res)=> {
       
    const userName = req.body.userName;
    const password = req.body.Password;
    const schema = Joi.object({
        userName : Joi.string().required(),
        password: Joi.string().required()
    });

    const {error , value } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return null;
    }
    
    const query = `select * from Users where username like ?`;
    conn.connect(err => {
        if(!err){
            conn.query(query,[userName] ,(err , rows )=> {
                if(!err){
                    console.log('db data' + rows);
                    if(rows[0].password === password){
                        res.send({
                            status: "Success"
                        });
                    }
                    else {
                        res.send({
                            status: "Error"
                        })
                    }
                     
                }
                else {
                    console.log('err' + err);
                }
            });
            conn.end();
        }
    });

    
    
  
    
   
})

module.exports = router;