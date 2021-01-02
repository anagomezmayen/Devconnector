const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const path = require('path');
//Bring the users
const users = require('./routes/api/users');
//Bring profiles
const profile = require('./routes/api/profile');
//Bring posts
const posts = require('./routes/api/post');

const app = express();

const { Passport } = require('passport');

//Body parser config
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Use routes
app.get('/', (req,res) => res.send('Hello world '));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Db Config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Mongo Db Connected'))
  .catch(err => console.log(error));


const port = 9000;

//Passport Config
app.use(passport.initialize());
require('./config/passport')(passport);


app.listen(port, () => console.log(`Server running on port ${port}`));