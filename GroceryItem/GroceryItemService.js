const GroceryItemDB = require('./GroceryItemDB');

var GroceryService = {
    AddGroceryItem: async function (name) {
        try {
            return await GroceryItemDB.CreateGroceryItem(name);
        } catch (error) {
            throw error;
        }
    },
    RemoveGroceryItem: async function (id) {
        try {
            return await GroceryItemDB.DeleteGroceryItem(id);
        } catch (error) {
            throw error;
        }
    },
    GetAllGroceryItems: async function () {
        try {
            return await GroceryItemDB.GetAllGroceryItems();
        } catch (error) {
            throw error;
        }
    },
    GetGroceryItemById: async function (id) {
        try {
            return await GroceryItemDB.GetGroceryItemById(id);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;