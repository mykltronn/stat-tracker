const express = require('express');
const Activity = require('../models/actSchema.js');
//===================================
function createdat(){
  var month;
  var date;
  var year;
  var currentDate = new Date();

  month = currentDate.getMonth();
  if((currentDate.getMonth() + 1) < 10){
    month = ("0" + (currentDate.getMonth()+1))
  }

  date = currentDate.getDate();
  if(currentDate.getDate() < 10) {
    date = ("0" + (currentDate.getDate()))
  }
  year = currentDate.getFullYear();
  var newDate = (month + "/" + date + "/" + year)
  return newDate
}
//===================================
const router = express.Router();

router.route('/:act_id')
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
router.route('/:act_id/stats')
  .post(function(req, res){
    console.log("user attemps to POST new data to specific activity");
    Activity.findById(req.params.act_id, function(err, activity) {
      if (err) {
        res.send("Could not locate activity with id: " + req.params.act_id)
      }
      else {
        console.log("new datum captured");
        activity.stat.push( { "value": req.body.stat, "date": createdat() } );

        activity.save(function(err) {
          if (err) {
            console.log("something went wrong adding new datum to database");
            res.send(err)
          }
          else{
            res.send("New datum entered")
          }
        })
      }
    })
  })


module.exports = router;



//
