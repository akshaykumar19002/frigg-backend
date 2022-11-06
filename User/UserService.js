const UserDB = require('./UserDB');
const FridgeService = require('../Fridge/FridgeService');
const FridgeUserService = require('../FridgeUser/FridgeUserService');
const Common = require('../Common/common');

var UserService = {
    AddUser: async function (email, password, fullname, invite_code) {
        try {
            const user = await UserDB.getUserByEmailId(email);
            if (!user) {
                if(await UserDB.isUserDeleted(email)) {
                    await UserDB.restoreUser(email);
                }
                else {
                    await UserDB.CreateUser(email, password, fullname);
                }


                var fridge = !Common.isNullorUndefined(invite_code) ? await FridgeService.GetFridgeIdByInviteCode(invite_code) : null;

                let newUser = await UserDB.getUserByEmailId(email)
                
                if(!fridge || !invite_code) {
                    fridge = await FridgeService.CreateFridge(newUser.id);
                }
                
                // associate new user and fridge
                await FridgeUserService.AssociateUserAndFridge(fridge.id, newUser.id);



                return { "message": "User created" };
            } else {
                return { "message": "User already exist" };
            }
        } catch (error) {
            throw error;
        }
    },
    RemoveUser: async function (id) {
        try {
            var response = await UserDB.DeleteUser(id);
            if (!response) {
                throw new Error("User not found");
            }
            return {message: "User deleted"};
        } catch (error) {
            throw error;
        }
    },
    GetAllUsers: async function () {
        try {
            var response = await UserDB.GetAllUsers();
            response.forEach(element => {
                this.DeleteProperties(element);
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    GetUserById: async function (id) {
        try {
            var user = await UserDB.GetUserById(id);
            if (!user) {
                throw new Error("User not found");
            }
            this.DeleteProperties(user);
            return user;
        } catch (error) {
            throw error;
        }
    },
    DeleteProperties: function (response) {
        delete response.dataValues.createdAt;
        delete response.dataValues.updatedAt;
        delete response.dataValues.deletedAt;
        delete response.dataValues.password;
        delete response.dataValues.token;
    }
};

module.exports = UserService;