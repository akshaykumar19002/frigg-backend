const express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

const GroceryItemRouter = require('./GroceryItem/GroceryItemRoute');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

router.use('/GroceryItem', GroceryItemRouter);

app.listen(port, function () {
  console.log('Frigg app listening on port ' + port);
});