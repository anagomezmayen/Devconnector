const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  name:{
    type : String,
    require : true
  },
  email:{ 
    type: String,
    require: true
  },
  password:{
    type: String,
    require:true
  },
  avatar:{
    type: String,
    require: false
  },
  date:{
    type: Date,
    default:Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema); //users is the name of the physcal table on the db