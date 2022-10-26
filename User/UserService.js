const UserDB = require('./UserDB');

var UserService = {
    AddUser: async function (email, password, fullname) {
        try {
            const user = await UserDB.CheckUserExist(email);
            if (!user) {
                var createdUser = await UserDB.CreateUser(email, password, fullname);
                if(createdUser) {
                    return { "message": "User created" };
                }
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