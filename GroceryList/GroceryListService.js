const GroceryItemDB = require('./GroceryListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}

// GroceryList = sequelize.define('grocery_list', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     fridge_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     grocery_item_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.DECIMAL,
//         allowNull: false
//     },
// }, {
//     underscored: true,
//     paranoid: true,
// });

// const GroceryItem = sequelize.define('grocery_item', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
// }, {
//     paranoid: true,
//     underscored: true
// });

var GroceryService = {
    GetAllGroceryListByFridgeId: async function (fridgeId) {
        try {
            let groceryList = await GroceryItemDB.GetGroceryListByFridgeId(fridgeId);
            if (groceryList === undefined || groceryList.length === 0) {
                return {
                    message: "No item in grocery list"
                }
            }
            groceryList.forEach(groceryListItem => {
                DeleteProperties(groceryListItem);
                groceryListItem.dataValues.grocery_item_name = groceryListItem.dataValues.grocery_item.name;
                delete groceryListItem.dataValues.grocery_item;
            });
            return groceryList;
        } catch (error) {
            throw error;
        }
    },
    AddGroceryItem: async function (fridgeId, groceryItemId) {
        try {
            var response = await GroceryItemDB.AddOrIncreaseGroceryItemQuantityByOne(fridgeId, groceryItemId);
            DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    DeleteGroceryItem: async function (fridgeId, groceryItemId) {
        try {
            var groceryItem = await GroceryItemDB.ReduceGroceryItemQuantityByOneOrDelete(fridgeId, groceryItemId);
            if (!groceryItem) {
                return {
                    message: "Item already doesn't exist in the fridge"
                }
            }
            DeleteProperties(groceryItem);
            return groceryItem.dataValues;
        } catch (error) {
            throw error;
        }
    },
    UpdateGroceryListByGroceryItemslist: async function (fridgeId, groceryItemsList) {
        try {
            var groceryUpdated = await GroceryItemDB.UpdateGroceryListByFridgeIdAndGroceryItemslist(fridgeId, groceryItemsList);
            if (!groceryUpdated) {
                return {
                    message: "No item in grocery list"
                }
            }
            return groceryUpdated;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;