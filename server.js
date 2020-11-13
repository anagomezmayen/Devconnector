const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Db Config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Mongo Db Connected'))
  .catch(err => console.log(error));

//first route
app.get('/', (req,res) => res.send('Hello world '));

const port = 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));