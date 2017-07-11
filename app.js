// currently working problem, api.js line 51-ish. Stuck trying to access a specific stat from an activities array of stats.
// also haven't incorporated authentication
// and also, in the hardmode description what does it mean to add a front end to the api... does that mean documentation for how to use it? Or just a front-end that displays stuff? A single page app for displaying acivities and data?


const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const User = require('./models/userSchema.js')
const bcrypt = require('bcryptjs')
const router = express.Router();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', "./views");

app.use(express.static('styles'))
app.use(express.static('scripts'))
 //================================================================
// routes

const route = require('./routes/home.js');
app.use(route);


const apiRouter = require('./routes/api.js');
app.use('/api', apiRouter);


app.listen(8080, function(req, res){
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("You're up and running, baller @ http://localhost:8080");
});
