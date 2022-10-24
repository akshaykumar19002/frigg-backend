const db = require('../Config/db');

async function CreateUser(email, password) {
    try {
        const user = await db.user.findOne({
            where: {
                email: email
            },
            paranoid: false,
        });
        if (user) {
            user.restore();
            await user.save();
            return user;
        } else {
            const user = await db.user.create({
                email: email,
                password: password
            });
            return user;
        }
    } catch (error) {
        console.log(error);
    }
}

async function DeleteUser(id) {
    try {
        const user = await db.user.destroy({
            where: {
                id: id
            }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function GetAllUsers() {
    try {
        const users = await db.user.findAll();
        return users;
    } catch (error) {
        console.log(error);
    }
}

async function GetUserById(id) {
    try {
        const user = await db.user.findByPk(id);
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function AuthenticateUser(token) {
    try {
        const user = await db.user.findOne({
            where: {
                token: token
            }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function CheckUserExist(email) {
    try {
        const user = await db.user.findOne({
            where: {
                email: email
            }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function UpdateUserPassword(id, password) {
    try {
        const user = await db.user.findByPk(id);
        user.password = password;
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    CreateUser,
    DeleteUser,
    GetAllUsers,
    GetUserById,
    AuthenticateUser,
    CheckUserExist,
    UpdateUserPassword
}