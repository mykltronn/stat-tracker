const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const apiRouter = require('./api.js');
const User = require('../models/userSchema.js')

mongoose.Promise = require('bluebird');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



router.route('/')
  .get(function(req, res) {
    console.log("user GETs '/'");;
    res.render('index.mustache')
    })

  .post(function(req, res) {
      console.log("user attemps to post new body");
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
        console.log("user redirected to /home");
        res.redirect('/home')
      })
    }
  })

router.route('/home')
    .get(function(req, res) {
        res.render('home.mustache')
    })



// ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
router.use('/api', apiRouter);

module.exports = router;
