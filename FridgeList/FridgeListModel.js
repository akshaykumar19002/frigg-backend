const Sequelize = require("sequelize");
const db = require("../config/db");

const FridgeList = db.define("fridge_list", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fridge_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fridge_item_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expiry_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  purchase_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = FridgeList;
