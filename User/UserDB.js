const db = require('../Config/db');
const bcrypt = require('bcrypt');

async function CreateUser(email, password, full_name) {
    try {
        const user = await db.user.create({
            email: email,
            password: password,
            full_name: full_name,
        });
        return user;
    } catch (error) {
        throw error;
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
        throw error;
    }
}

async function GetAllUsers() {
    try {
        const users = await db.user.findAll();
        return users;
    } catch (error) {
        throw error;
    }
}

async function GetUserById(id) {
    try {
        const user = await db.user.findByPk(id);
        return user;
    } catch (error) {
        throw error;
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
        throw error;
    }
}

async function getUserByEmailId(email) {
    try {
        const user = await db.user.findOne({
            where: {
                email: email
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
}

async function UpdateUserPassword(id, password) {
    try {
        const user = await db.user.findByPk(id);
        user.passworsd = password;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

async function isUserDeleted(email) {
    try {
        const user = await db.user.findOne({
            where: {
                email: email
            },
            paranoid: false,
        });
        if (user !== null && user.deleted_at !== null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

async function restoreUser(email) {
    try {
        const user = await db.user.findOne({
            where: {
                email: email
            },
            paranoid: false,
        });
        await user.restore();
        return user;
    } catch (error) {
        throw error;
    }
}

async function GetUserByInviteCode(invite_code) {
    try {
        const user = await db.user.findOne({
            where: {
                invite_code: invite_code
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
}

async function AddPreferences(id, no_of_notifications) {
    try {
        const user = await db.user.findByPk(id);
        user.no_of_notifications = no_of_notifications;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}


async function ChangePassword(id, newPassword) {
    try {
        const user = await db.user.findByPk(id);
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    CreateUser,
    DeleteUser,
    GetAllUsers,
    GetUserById,
    AuthenticateUser,
    getUserByEmailId,
    UpdateUserPassword,
    isUserDeleted,
    restoreUser,
    GetUserByInviteCode,
    AddPreferences,
    ChangePassword
}
