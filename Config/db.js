const Sequelize = require('sequelize');

const db = new Sequelize('frigg', 'admin', 'friggapp', {
    dialect: 'mysql',
    host: 'database-1.caddvx2nfdsw.us-east-1.rds.amazonaws.com'
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;