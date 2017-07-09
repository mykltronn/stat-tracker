const express = require('express');
const router = express.Router();

// shows a list of all activities user is tracking and links to thei individual pages
router.get('/api/activities', function(req,res){
  //filler date...
  var date = new Date();
  var currentDate = (date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());

  // res.json([
  //   {
  //   "userId": 1,
  //   "id": 1,
  //   "title": "steps-taken",
  //   "data": 1250,
  //   "date": currentDate
  // },
  // {
  //   "userId": 1,
  //   "id": 2,
  //   "title": "flights",
  //   "data": 6,
  //   "date": currentDate
  // },
  // {
  //   "userId": 1,
  //   "id": 3,
  //   "title": "laps",
  //   "data": 12,
  //   "date": currentDate
  // },
  // {
  //   "userId": 2,
  //   "id": 1,
  //   "title": "laps",
  //   "data": 50,
  //   "date": currentDate
  // },
  // {
  //   "userId": 2,
  //   "id": 2,
  //   "title": "marathons",
  //   "data": 11,
  //   "date": currentDate
  // },
  // {
  //   "userId": 3,
  //   "id": 1,
  //   "title": "pies",
  //   "data": 1,
  //   "date": currentDate
  // }
  // ])
})


// Create new activity for user to track
router.post('/', function(req,res){

})

//show information about one activity user is tracking, give data user has recorded
router.get('/:id', function(req,res){

})

router.put('/:id', function(req,res){

})


module.exports = router;



//
