const express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

const db = require('./Config/db');
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const FoodItemRouter = require('./FoodItem/FoodItemRoute');
const GroceryListRouter = require('./GroceryList/GroceryListRoute');
const FridgeRouter = require('./Fridge/FridgeRoute');
const FridgeListRouter = require('./FridgeList/FridgeListRoute');
const UserRouter = require('./User/UserRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log('here')
    db.user.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.user.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use('/', router);

router.use('/FoodItem', FoodItemRouter);
router.use('/GroceryList', GroceryListRouter);
router.use('/Fridge', FridgeRouter);
router.use('/FridgeList', FridgeListRouter);
router.use('/User', UserRouter);

db.sequelize.sync()
  .then(() => {
    app.listen(port, function () {
      console.log('Frigg app listening on port ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  })