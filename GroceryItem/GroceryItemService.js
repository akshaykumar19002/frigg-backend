const GroceryItemDB = require('./GroceryItemDB');

var GroceryService = {
    AddGroceryItem: async function (name) {
        try {
            return await GroceryItemDB.CreateGroceryItem(name);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;