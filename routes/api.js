const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stat-trackerdb')
const User = require('../models/userSchema.js')
const Activity = require('../models/actSchema.js')
const router = express.Router();
const actRouter = require('./activity.js')
const bcrypt = require('bcryptjs')
//==============================================
var currentUser;
passport.use(new BasicStrategy(
  function(username, password, done) {
    currentUser = username;
    console.log("basic strategy is running");
    User.findOne( { username: username }, function(err, user){
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

// req.user.name stores user, i think.
// //==============================================

router.use(passport.authenticate('basic', {session: false}))

router.route('/activities')
  .get(function(req, res) {
    console.log("user attempts to GET all activities");
    Activity.find(function(err, activities) {
      if(err) res.send(err);

      res.json(activities);
    })
  })
  .post(function(req, res){
    console.log("user attemps to POST new activity");
    var newActivity = new Activity();
    newActivity.title = req.body.title;

    newActivity.save(function(err){
      if (err){
        res.send(err)
      }
      else {
        console.log("new activity added to db!");
        res.send('new activity added')
      }

    })

  })
//=======================================================

router.delete('/stats/:stat_id', function(req, res) {
  console.log("user requests delete");
  console.log(currentUser);
  Activity.findOne({}, 'stat', function(err, stat){
      for(i=0; i<stat.stat.length; i++){
          console.log(stat.stat[i]._id);
          if(stat.stat[i]._id === req.params.stat_id) {
            stat.stat[i].remove({id: req.params.stat_id}, function(err, stat) {
              if (err) {
                console.log("something went wrong with stat DELETE");
                res.send(err)
              }
              else{
                console.log('stat removed: ' + stat);
                res.send('stat removed from activity')
              }
            })
          }
      }
  })
})

router.use('/activities', actRouter);

module.exports = router;
