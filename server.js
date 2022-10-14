const express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const db = require('./Config/db');
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const GroceryItemRouter = require('./GroceryItem/GroceryItemRoute');
const GroceryListRouter = require('./GroceryList/GroceryListRoute');
const FridgeRouter = require('./Fridge/FridgeRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

router.use('/GroceryItem', GroceryItemRouter);
router.use('/GroceryList', GroceryListRouter);
router.use('/Fridge', FridgeRouter);

db.sequelize.sync()
  .then(() => {
    app.listen(port, function () {
      console.log('Frigg app listening on port ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  })