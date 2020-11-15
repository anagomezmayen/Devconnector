const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const keys = require('../../config/keys');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email })
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        });

      }
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login user / Return JWT Token
// @access  Public

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email })
    .then(user =>{
      if(!user){
        return res.status(404).json({email: 'User not found'});
      }else{
        bcrypt.compare(req.body.password, user.password)
            .then(isMatch =>{
              if(isMatch){
                //return res.json({msg:'Succes'});
                //sign token
                const playload= {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar
                };
                jwt.sign(
                  playload, 
                  keys.secretOrKey,
                  {expiresIn:3600},//one hour
                  (err, token)=>{
                    return res.json({token: 'Bearer'+token})
                  });
              }else{
                return res.status(404).json({password:'Invalid password'});
              }
            });
      }
    })
    .catch(err => console.log(error));  
})







module.exports = router;