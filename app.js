//current working problem is in actSchema. Timestamps not working. Or maybe they are, but are only accessible through stat.timestamp() or something like that in the front-end.
// also haven't incorporated authentication

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stat-trackerdb')
const Activity = require('./models/actSchema.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

passport.use(new BasicStrategy(
  function(username, password, done) {
    const userPassowrd = "where it is in mongo";
    if (!userPassowrd) { return done(null, false); }
    if (userPassowrd !== password) { return done(null, false); }
    return done(null, username);
  }
));
 //================================================================

const router = express.Router();

router.use(function(req, res, next){
  console.log("Middleware executes!");
  next();
})

router.get('/', function(req, res) {
    res.json({ "hello": 'here yar' });
});

//===================================================
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


//===================================
router.route('/activities/:act_id')
  .get(function(req, res) {
    console.log("user attemps GET from specific activity");
    Activity.findById(req.params.act_id, function(err, activity) {
      if (err) res.send(err);
      res.json(activity);
    })
  })
  .put(function(req, res) {
    console.log("User attempts a PUT on specific activity");
    Activity.findById(req.params.act_id, function(err, activity) {
      console.log("user accesses " + activity);
      if (err) res.send(err);
      activity.title = req.body.title;

      activity.save(function(err) {
        if (err) {
          console.log("something went wrong with activity PUT");
          res.send(err)
        }
        else{
          res.send('activity edited')
        }
      })
    })
  })
  .delete(function(req, res) {
    Activity.remove({_id: req.params.act_id}, function(err, activity) {
      if (err) {
        console.log("something went wrong with activity DELETE");
        res.send(err)
      }
      else{
        console.log('activity removed');
        res.send('activity removed from db')
      }
    })
  })

//=====================================
router.route('/activities/:act_id/stats')
  .post(function(req, res){
    console.log("user attemps to POST new data to specific activity");
    Activity.findById(req.params.act_id, function(err, activity) {
      if (err) {
        res.send("Could not locate activity with id: " + req.params.act_id)
      }
      else {
        console.log("new datum captured");
        activity.stat = req.body.stat

        activity.save(function(err) {
          if (err) {
            console.log("something went wrong adding new datum to database");
            res.send(err)
          }
          else{
            res.send("New datum entered")
            console.log(activity.stat);
          }
        })
      }
    })
  })

app.listen(8080, function(req, res){
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("You're up and running, baller @ http://localhost:8080");
});
