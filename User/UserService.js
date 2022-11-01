const UserDB = require('./UserDB');
const FridgeService = require('../Fridge/FridgeService');
const FridgeUserService = require('../FridgeUser/FridgeUserService');

var UserService = {
    AddUser: async function (email, password, fullname, invite_code) {
        try {
            const user = await UserDB.getUserByEmailId(email);
            if (!user) {
                if(await UserDB.isUserDeleted(email)) {
                    await UserDB.restoreUser(email);
                }
                else {
                    await UserDB.CreateUser(email, password, fullname, invite_code);
                }


                let invitingUser = UserDB.GetUserByInviteCode(invite_code);
                let newUser = await UserDB.getUserByEmailId(email)
                if(invite_code && invitingUser) {
                    if(!invitingUser) {
                        // get fridge id by inviting user
                        let fridgeId = FridgeUserService.GetFridgeIdByUserId(invitingUser.id);
                        // associate new user and fridge
                        FridgeUserService.AssociateUserAndFridge(fridgeId, newUser.id);
                    }
                }
                else {
                    // create fridge.
                    let fridge = await FridgeService.CreateFridge(newUser.id);
                    FridgeUserService.AssociateUserAndFridge(fridge.id, newUser.id);
                }



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