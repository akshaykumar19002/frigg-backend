const FridgeItemDB = require('./FridgeListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('fridge_list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        food_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        expected_expiry_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        underscored: true,
        paranoid: true,
    });
}
var GroceryService = {
    GetAllFridgeListByFridgeId: async function (fridgeId) {
        try {
            let fridgeList = await FridgeItemDB.GetFridgeListByFridgeId(fridgeId);
            if (fridgeList === undefined || fridgeList.length === 0) {
                return {
                    message: "No item in fridge list"
                }
            }
            console.log(fridgeList.length);
            fridgeList.forEach(groceryListItem => {
                DeleteProperties(groceryListItem);
                groceryListItem.dataValues.food_item_name = groceryListItem.dataValues.food_item.name;
                delete groceryListItem.dataValues.food_item;
            });
            return fridgeList;
        } catch (error) {
            throw error;
        }
    },
    AddFoodItem: async function (fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
        try {
            var foodItemAdded = await FridgeItemDB.AddFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate);
            if (foodItemAdded) {
                return {
                    message: "Food item added to Fridge"
                }
            }
            return {
                message: "Food item not added"
            }
        } catch (error) {
            throw error;
        }
    },
    UpdateFridgeListByFoodItemslist: async function (fridgeId, foodItemsList) {
        try {
            var groceryUpdated = await FridgeItemDB.UpdateFridgeListByFridgeIdAndFoodItemslist(fridgeId, foodItemsList);
            if (!groceryUpdated) {
                return {
                    message: "No item in fridge list"
                }
            }
            return groceryUpdated;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;