const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

//Bring the users
const users = require('./routes/api/users');

//Body parser config
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//Db Config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Mongo Db Connected'))
  .catch(err => console.log(error));

//first route
app.get('/', (req,res) => res.send('Hello world '));
app.use('/api/users', users);

const port = 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));