const db = require('../Config/db');

createFridgeUser = async (fridge_id, user_id) => {
    try {
        return await db.fridge_user.create({
            fridge_id,
            user_id
        });
    } catch (err) {
        throw err;
    }
};

getUsersByFridgeId = async (fridge_id) => {
    try {
        return await db.fridge_user.findAll({
            where: {
                fridge_id
            }
        });
    } catch (err) {
        throw err;
    }
};

deleteFridgeUser = async (fridge_id, user_id) => {
    try {
        return await db.fridge_user.destroy({
            where: {
                fridge_id,
                user_id
            }
        });
    } catch (err) {
        throw err;
    }
};
getFridgeByUserId = async (user_id) => {
    try {
        return await db.fridge_user.findOne({
            where: {
                user_id
            }
        });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createFridgeUser,
    getUsersByFridgeId,
    deleteFridgeUser,
    getFridgeByUserId
};