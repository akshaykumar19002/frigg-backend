const FridgeUserDB = require('./FridgeUserDB');

var FridgeUserService = {
    GetUsersByFridgeId: async function (fridgeId) {
        try {
            var response = await FridgeUserDB.getUsersByFridgeId(fridgeId);
            this.DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    AssociateUserAndFridge: async function (fridgeId, userId) {
        try {
            var fridge = await FridgeUserDB.createFridgeUser(fridgeId, userId);
            if (!fridge) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    },
    GetFridgeIdByUserId: async function (userId) {
        try {
            var fridge = await FridgeUserDB.getFridgeByUserId(userId);
            if (!fridge) {
                throw new Error("Fridge not found");
            }
            return fridge.fridge_id;
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

module.exports = FridgeUserService;