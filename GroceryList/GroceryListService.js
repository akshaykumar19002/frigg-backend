const GroceryItemDB = require('./GroceryListDB');

var GroceryService = {
    GetAllGroceryListByFridgeId: async function (fridgeId) {
        try {
            return await GroceryItemDB.GetGroceryListByFridgeId(fridgeId);
        } catch (error) {
            throw error;
        }
    },
    AddGroceryItem: async function (fridgeId, groceryItemId) {
        try {
            return await GroceryItemDB.AddOrIncreaseGroceryItemQuantityByOne(fridgeId, groceryItemId);
        } catch (error) {
            throw error;
        }
    },
    DeleteGroceryItem: async function (fridgeId, groceryItemId) {
        try {
            return await GroceryItemDB.ReduceGroceryItemQuantityByOneOrDelete(fridgeId, groceryItemId);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;