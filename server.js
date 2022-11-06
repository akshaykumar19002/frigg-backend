const express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

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
const FridgeUserRouter = require('./FridgeUser/FridgeUserRoute');
const DishNameSuggestionRouter = require('./DishNameSuggestion/DishNameSuggestionRoute');
const GenerateGroceryListRouter = require('./GenerateGroceryList/GenerateGroceryListRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

passport.use(new localStrategy({usernameField: 'email'},
  async function(email, password, done) {
    try {
      const user = await db.user.findOne({ where: {email: email}});
      if (!user) { return done(null, false); }
      if (!(await user.verifyPassword(password))) { 
        return done(null, false);
      }
      return done(null, user); 
    } catch (err) {
      return done(err);
    }
  }
));

app.use('/', router);

router.use('/User', UserRouter);
router.use('/FoodItem', FoodItemRouter);
router.use('/GroceryList', GroceryListRouter);
router.use('/Fridge', FridgeRouter);
router.use('/FridgeUser', FridgeUserRouter);
router.use('/FridgeList', FridgeListRouter);
router.use('/DishNameSuggestion', DishNameSuggestionRouter)
router.use('/GenerateGroceryList', GenerateGroceryListRouter);

db.sequelize.sync()
  .then(() => {
    app.listen(port, function () {
      console.log('Frigg app listening on port ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  })




  // TODO: check user login, able to login with any password