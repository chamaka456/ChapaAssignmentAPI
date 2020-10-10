const express = require('express');
const conn = require('../services/DbConnection');
const Joi = require('joi');
const router = express.Router();

router.get('/chatlist/:userId', (req , res)=> {
    console.log("ok");
    const schema = {
        userId: Joi.number().required()
    };
    console.log(req.params);
    // const {error , value } = schema.validate(req.params);
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return null;
    // }
    const query = 'select chat.chatId , chatName  from ChatUser inner join chat on ChatUser.chatId = chat.chatId where chatuser.userId = ?';
    // const query = 'select chatId from chatuser where userId = ?';
    // const query2 = 'select * from chat where chatId = ?';
  
    conn.query(query,[req.params.userId] ,(err , rows )=> {
        if(!err){
            console.log('db data' + rows);

            res.send(rows);
        }
        else {
            console.log('err' + err);
        }
    });
})

router.post('/', (req , res)=> {
       
    const chatName = req.body.chatName;
    const usersList = req.body.usersList;
    const schema = Joi.object({
        chatName : Joi.string().required(),
        usersList: Joi.required()
    });

    const {error , value } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return null;
    }
    
    const chatQuery = 'insert into chat (chatname, hashString) values (? , ?)';
    const chatUserQuery = 'insert into chatuser (chatId, userId) values (? , ?)';
  
    conn.query(chatQuery,[chatName,"aaaaaa"],(err , rows )=> {
        if(!err){
            console.log(rows);

            usersList.forEach(element => { 
                console.log(element); 
                
                conn.query(chatUserQuery,[rows.insertId, element],(err , rows2 )=> {
                    if(!err){
                        console.log(rows2);
                    }
                    else {
                        console.log('err' + err);
                    }
                });
            });

            res.status(200).send();

        }
        else {
            console.log('err' + err);
        }
    });
   
})

module.exports = router;