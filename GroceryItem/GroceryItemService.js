const GroceryItemDB = require('./GroceryItemDB');

var GroceryService = {
    AddGroceryItem: async function (name) {
        try {
            var response = await GroceryItemDB.CreateGroceryItem(name);
            this.DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    RemoveGroceryItem: async function (id) {
        try {
            var response = await GroceryItemDB.DeleteGroceryItem(id);
            this.DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    GetAllGroceryItems: async function () {
        try {
            var response = await GroceryItemDB.GetAllGroceryItems();
            response.forEach(element => {
                this.DeleteProperties(element);
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    GetGroceryItemById: async function (id) {
        try {
            var response = await GroceryItemDB.GetGroceryItemById(id);
            this.DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    DeleteProperties: function (response) {
        delete response.dataValues.createdAt;
        delete response.dataValues.updatedAt;
        delete response.dataValues.deletedAt;
    }
};

module.exports = GroceryService;