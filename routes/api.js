const express = require('express');
const router = express.Router();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const activitiesRouter = require('./activities/activities.js')


passport.use(new BasicStrategy(
  function(username, password, done) {
    const userPassowrd = "where it is in mongo";
    if (!userPassowrd) { return done(null, false); }
    if (userPassowrd !== password) { return done(null, false); }
    return done(null, username);
  }
));


// router.use(function(req,res,next){
//   console.log("This is where user will be authenticated");
//   next()
// })



//user requests /api v v v
router.get('/',
        passport.authenticate('basic', {session: false}),
        function(req, res) {
          res.json({"Hello": req.user})
        }
)


//user request to POST to /api`
// ?? maybe user can't post to /api...

router.use(activitiesRouter)

module.exports = router;
