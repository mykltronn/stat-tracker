const express = require('express');
const passport = require('passport');
const TokenStrategy = require('passport-accesstoken').Strategy; //TokenStrategy
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stat-trackerdb')
const User = require('../models/userSchema.js')
const Activity = require('../models/actSchema.js')
//===============================================

// V this V is the setup for the passport-accesstoken strategy for Passport...

// passport.use(new TokenStrategy(function(token, done){
//   User.findOne({token: token}, functin(err, user) {
//     if (err) {
//       return done(err);
//     }
//
//     if (!user) {
//       return done(null, false);
//     }
//
//     if (!user.verifyToken(token)) {
      // return done(null, false);
//     }
//
//     return done(null, user)
//   })
// }))

//=================================================
const actRouter = require('./activity.js')
const router = express.Router();

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
  Activity.find(function(err, activities){
    console.log('activities pulled for stat removal');
    console.log(activities);
    activities.stat.remove({_id: req.params.stat_id}, function(err, stat) {
      if (err) {
        console.log("something went wrong with stat DELETE");
        res.send(err)
      }
      else{
        console.log('stat removed: ' + stat);
        res.send('stat removed from activity')
      }
    })
  })
})

router.use('/activities', actRouter);

module.exports = router;
