const express = require('express');
const login = require('./routes/login');
const  app = express();
app.use(express.json());

app.use('/api/login',login);



app.get('/', function (req, res) {
  
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});