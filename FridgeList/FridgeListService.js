const FridgeItemDB = require('./FridgeListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
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
    AddFoodItem: async function (fridgeId, foodItemId) {
        try {
            var response = await FridgeItemDB.AddOrIncreaseFoodItemQuantityByOne(fridgeId, foodItemId);
            DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    DeleteFoodItem: async function (fridgeId, foodItemId) {
        try {
            var foodItemDeleted = await FridgeItemDB.ReduceFoodItemQuantityByOneOrDelete(fridgeId, foodItemId);
            if (!foodItemDeleted) {
                return {
                    message: "Item already doesn't exist in the fridge"
                }
            }
            return {
                message: "Grocery item deleted"
            };
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