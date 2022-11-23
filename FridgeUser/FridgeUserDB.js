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
            },
            include: [{
                model: db.user,
                attributes: ['email', 'full_name', 'id']
            }]
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
getFridgeUserByUserId = async (user_id) => {
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

getUserIdByFridgeKey = async (fridgeKey) => {
    try {
        return await db.fridge.findOne({ 
            include: [{
                model: db.fridge_user,
                attributes: ['user_id']
            }],
            where: {
                fridgeKey
            }
        });
    } catch (err) {
        throw err;
    }
};


updateFridgeIdByUserId = async (fridge_id, user_id) => {
    try {
        return await db.fridge_user.update({
            fridge_id
        }, {
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
    getFridgeUserByUserId,
    getUserIdByFridgeKey,
    updateFridgeIdByUserId,
};
