const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mustache = require('mustache-express');
const passport = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy; // BasicStrategy


const router = express.Router();
const apiRouter = require('./api.js');

// const jwt = require('jsonwebtoken') // BasicStrategy
// const config = require('../config/config.js') // BasicStrategy
const User = require('../models/userSchema.js')



mongoose.Promise = require('bluebird');
// mongoose.connect(config.database) // BasicStrategy
// app.set('superSecret', config.secret); // BasicStrategy

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//===============================================
// authentication

//auth middleware
// passport.use(new BasicStrategy(
//   function(username, password, done) {
//     const userPassowrd = "where it is in mongo";
//     if (!userPassowrd) { return done(null, false); }
//     if (userPassowrd !== password) { return done(null, false); }
//     return done(null, username);
//   }
// ));

//=================================================
// might need to remove all this if else business if authentication happens elsewhere

router.route('/')
  .get(function(req, res) {
    res.render('index.mustache', {auth: false })
    // if(token){
    //   res.render('index.mustache', { auth: true })
    // }
    // if(!token){
    //   res.render('index.mustache', { auth: false })
    // }
  })
  .post(function(req, res) {


    // =======   if user submits login
    if(req.body.username){
      // verify
    }



    // =======   if user submits new user
    if(req.body.newusername){
      let newUser = new User({
        "username": req.body.newusername,
        "password": req.body.newpassword
      });
      newUser.save(function(err) {
        if (err){
          res.send(err);
        }
        console.log("newUser successfully added to db");
        console.log("user redirected to somewhere");
      })
    }


    // ======= if user submits new activity/or stat?


  })


// mount to '/api' api.js so that everything in api.js runs from /api
router.use('/api', apiRouter);

module.exports = router;
