const FoodItemDB = require('./GroceryListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}

var GroceryService = {
    GetAllGroceryListByFridgeId: async function (fridgeId) {
        try {
            let groceryList = await FoodItemDB.GetGroceryListByFridgeId(fridgeId);
            if (groceryList === undefined || groceryList.length === 0) {
                return {
                    message: "No item in grocery list"
                }
            }
            groceryList.forEach(groceryListItem => {
                DeleteProperties(groceryListItem);
                console.log(groceryListItem.dataValues.food_item);
                groceryListItem.dataValues.food_item_name = groceryListItem.dataValues.food_item.name;
                delete groceryListItem.dataValues.food_item;
            });
            return groceryList;
        } catch (error) {
            throw error;
        }
    },
    AddFoodItem: async function (fridgeId, foodItemId, quantity) {
        try {
            var itemAdded = await FoodItemDB.AddFoodItemInGroceryList(fridgeId, foodItemId, quantity);
            if (!itemAdded) {
                return {
                    message: "Item already exists in the grocery list"
                }
            } else {
                return {
                    message: "Item added"
                }
            }
        } catch (error) {
            throw error;
        }
    },
    DeleteFoodItem: async function (fridgeId, foodItemId) {
        try {
            var isDeleted = await FoodItemDB.DeleteFoodItemInGroceryList(fridgeId, foodItemId);
            if (!isDeleted) {
                return {
                    message: "Item already doesn't exist in the grocery list"
                }
            } else {
                return {
                    message: "Item deleted"
                }
            }
        } catch (error) {
            throw error;
        }
    },
    UpdateGroceryListByFoodItemslist: async function (fridgeId, foodItemsList) {
        try {
            var groceryUpdated = await FoodItemDB.UpdateGroceryListByFridgeIdAndFoodItemslist(fridgeId, foodItemsList);
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