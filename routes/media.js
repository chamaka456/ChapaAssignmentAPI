const express = require('express');
const conn = require('../services/DbConnection');
const Joi = require('joi');
const router = express.Router();

router.get('/:videoName', (req , res)=> {
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
    const query = 'select videoHash from contracts where videoName like ?';
  
    conn.query(query,[videoName] ,(err , rows )=> {
        if(!err){
            console.log(rows);

            mediaUrl = rows.aaaaaaaaaaaa

            res.send(mediaUrl);
        }
        else {
            console.log('err' + err);
        }
    });
})

router.post('/', (req , res)=> {
       
    const videoUrl = req.body.hashstring;
    const videoName = req.body.type;
    const schema = Joi.object({
        videoUrl : Joi.string().required(),
        videoName: Joi.string().required()
    });

    const {error , value } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return null;
    }
    
    const mediaHash = 1

    const query = 'insert into viedeos (videoName, videoHash) values (? , ?)';
  
    conn.query(query,[videoName , mediaHash],(err , rows )=> {
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