const express = require('express');
const conn = require('../services/DbConnection');
const Joi = require('joi');
const router = express.Router();

router.get('/:fileName', (req , res)=> {
    console.log("ok");
    const schema = {
        videoName: Joi.string().required()
    };
    console.log(req.params);
    // const {error , value } = schema.validate(req.params);
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return null;
    // }
    const query = 'select fileUploadHash from contracts where fileName like ?';
  
    conn.query(query,[fileName] ,(err , rows )=> {
        if(!err){
            console.log(rows);

            fileurl = rows.aaaaaaaaaaaaaaaaaa

            res.send(fileurl);
        }
        else {
            console.log('err' + err);
        }
    });
})

router.post('/', (req , res)=> {
       
    const fileUrl = req.body.hashstring;
    const fileName = req.body.type;
    const schema = Joi.object({
        fileUrl : Joi.string().required(),
        fileName: Joi.string().required()
    });

    const {error , value } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return null;
    }
    
    const fileHash = 1

    const query = 'insert into viedeos (fileName, fileUploadHash) values (? , ?)';
  
    conn.query(query,[fileName , fileHash],(err , rows )=> {
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