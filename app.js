const express = require('express');
const login = require('./routes/login');
const chat = require('./routes/chat');
const messages = require('./routes/messages');
const  app = express();
app.use(express.json());

app.use('/api/login',login);
app.use('/api/chat',chat);
app.use('/api/messages',messages);

app.get('/', function (req, res) {
  
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});