const FridgeDB = require('./FridgeDB');

var FridgeService = {
    CreateFridge: async function (name) {
        try {
            var response = await FridgeDB.CreateFridge(name);
            this.DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    DeleteFridge: async function (id) {
        try {
            var fridge = await FridgeDB.DeleteFridge(id);
            if (!fridge) {
                throw new Error("Fridge not found");
            }
            return {
                message: "Fridge deleted"
            };
        } catch (error) {
            throw error;
        }
    },
    GetAllFridges: async function () {
        try {
            var response = await FridgeDB.GetAllFridges();
            response.forEach(element => {
                this.DeleteProperties(element);
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    GetFridgeById: async function (id) {
        try {
            var fridge = await FridgeDB.GetFridgeById(id);
            if (!fridge) {
                throw new Error("Fridge not found");
            }
            this.DeleteProperties(fridge);
            return fridge;
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

module.exports = FridgeService;