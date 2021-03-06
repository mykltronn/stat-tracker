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
        res.send('new activity added');
      }

    })

  })
//=======================================================

router.delete('/stats/:stat_id', function(req, res) {
    console.log("user requests delete");
    Activity.find({}, function(err, activity) {
        console.log(activity);
            for (i=0; i < activity.length; i++){
                console.log(activity[i]);
                    for (j=0; j < activity[i].stat.length; j++){
                        if (activity[i].stat[j]._id ==  req.params.stat_id) {
                            var deletePosition = activity[i].stat.indexOf(activity[i].stat[j])
                            console.log(deletePosition);
                            console.log("removing: " + activity[i].stat[j]);
                            activity[i].stat.splice(deletePosition, 1);
                            activity[i].save(function(err) {
                              if (err) {
                                  console.log("something went wrong saving the altered stat");
                                  res.send(err)
                              }
                              else{
                                  console.log("deleted");
                                  res.send("stat removed")
                              }
                            })
                        }
                }
            }
        })
    })

router.use('/activities', actRouter);

module.exports = router;
