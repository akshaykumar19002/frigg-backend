'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const config = require('./config');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

function readDir(dir) {
  fs
    .readdirSync(dir)
    .forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        if (file !== 'node_modules') {
          readDir(path.join(dir, file));
        }
      } else {
        if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'Model.js')) {
          const model = require(path.join(dir, file))(sequelize, Sequelize.DataTypes);
          db[model.name] = model;
        }
      }
    });
}




readDir(path.join(__dirname, '/../'));

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Associations 
db.user.hasMany(db.fridge_user);
db.fridge.hasMany(db.fridge_user);
db.fridge_user.belongsTo(db.user);
db.fridge_user.belongsTo(db.fridge);

db.grocery_item.hasMany(db.grocery_list);
db.grocery_list.belongsTo(db.grocery_item);



sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        module.exports = db;
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = db;