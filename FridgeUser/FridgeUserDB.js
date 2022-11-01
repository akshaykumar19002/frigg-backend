const db = require('../Config/db');

createFridgeUser = (fridge_id, user_id) => {
    return db.fridge_user.create({
        fridge_id,
        user_id
    });
};

getUsersByFridgeId = (fridge_id) => {
    return db.fridge_user.findAll({
        where: {
            fridge_id
        }
    });
};

deleteFridgeUser = (fridge_id, user_id) => {
    return db.fridge_user.destroy({
        where: {
            fridge_id,
            user_id
        }
    });
};
getFridgeByUserId = (user_id) => {
    return db.fridge_user.findAll({
        where: {
            user_id
        }
    });
};

module.exports = {
    createFridgeUser,
    getUsersByFridgeId,
    deleteFridgeUser,
    getFridgeByUserId
};