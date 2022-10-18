const sequelize = require('sequelize');
const FridgeList = require('./FridgeListModel');

async function AddOrIncreaseFridgeItemQuantityByOne(fridgeId, fridgeItemId) {
    try {
        const fridgeList = await FridgeList.findOne({
            where: {
                fridge_id: fridgeId,
                fridge_item_id: fridgeItemId
            }
        })
        if (fridgeList) {
            fridgeList.quantity += 1;
            await fridgeList.save();
            return fridgeList;
        } else {
            const fridgeList = await FridgeList.create({
                fridge_id: fridgeId,
                fridge_item_id: fridgeItemId,
                quantity: 1
            });
            return fridgeList;
        }
    } catch (error) {
        console.log(error);
    };
};

async function GetFridgeListByFridgeId(fridgeId) {
    try {
        const fridgeList = await FridgeList.findAll({
            where: {
                fridge_id: fridgeId
            }
        });
        return fridgeList;
    } catch (error) {
        console.log(error);
    };
};

async function ReduceFridgeItemQuantityByOneOrDelete(fridgeId, fridgeItemId) {
    try {
        const fridgeList = await FridgeList.findOne({
            where: {
                fridge_id: fridgeId,
                fridge_item_id: fridgeItemId
            }
        });
        if (fridgeList.quantity > 1) {
            fridgeList.quantity -= 1;
            await fridgeList.save();
            return fridgeList;
        } else {
            await fridgeList.destroy();
            return null;
        }
    } catch (error) {
        console.log(error);
    };
};



module.exports = {
    GetFridgeListByFridgeId,
    AddOrIncreaseFridgeItemQuantityByOne,
    ReduceFridgeItemQuantityByOneOrDelete
}