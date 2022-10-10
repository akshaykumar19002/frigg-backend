const Sequelize = require('sequelize');
const db = require('../config/db');

const GroceryList = db.define('grocery_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fridge_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grocery_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = GroceryList;