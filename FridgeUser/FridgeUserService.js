const FridgeUserDB = require('./FridgeUserDB');
const FridgeService = require('../Fridge/FridgeService')

var FridgeUserService = {
    GetUsersByFridgeId: async function (fridgeId) {
        try {
            var users = await FridgeUserDB.getUsersByFridgeId(fridgeId);
            var users_array = [];
            users.forEach(user => {
                var user_object = {
                    id: user.user.id,
                    full_name: user.user.full_name,
                    email: user.user.email
                }
                users_array.push(user_object);
            });
            return users_array;
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
            var fridge = await FridgeUserDB.getFridgeUserByUserId(userId);
            if (!fridge) {
                throw new Error("Fridge not found");
            }
            return fridge.id;
        } catch (error) {
            throw error;
        }
    },
    GetUserIdByFridgeInviteCode: async function (invite_code) {
        return await FridgeUserDB.getUserIdByFridgeKey(invite_code);
    },
    GetFridgeByUserId: async function (userId) {
        try {
            var fridgeUser = await FridgeUserDB.getFridgeUserByUserId(userId);
            let fridge = await FridgeService.GetFridgeById(fridgeUser.fridge_id);

            if (!fridge) {
                throw new Error("Fridge not found");
            }
            return fridge;
        } catch (error) {
            throw error;
        }
    },
    MergeUserAndFridge: async function(user_id, invite_code) {
            let fridgeId = await FridgeService.GetFridgeIdByInviteCode(invite_code);
            if(fridgeId) {
                await FridgeUserDB.updateFridgeIdByUserId(fridgeId.id, user_id);
                return { fridge_id: fridgeId };
            } else {
                return { message: "Invalid invite code"}
            }
        },
    DeleteProperties: function (response) {
        delete response.dataValues.createdAt;
        delete response.dataValues.updatedAt;
        delete response.dataValues.deletedAt;
    }
};

module.exports = FridgeUserService;
