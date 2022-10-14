const GroceryItemDB = require('./GroceryListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}

var GroceryService = {
    GetAllGroceryListByFridgeId: async function (fridgeId) {
        try {
            let groceryList = await GroceryItemDB.GetGroceryListByFridgeId(fridgeId);
            if (groceryList === undefined || groceryList.length === 0) {
                return {
                    message: "No item in grocery list"
                }
            }
            groceryList.forEach(element => {
                DeleteProperties(element);
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
    }
};

module.exports = GroceryService;