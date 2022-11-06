const db = require('../Config/db');
const FridgeUserDB = require('../FridgeUser/FridgeUserDB');


async function CreateFridge(userId) {
    try {
        const fridge = await db.fridge.create({});
        return fridge;
    } catch (error) {
        throw error;
    }
}

async function DeleteFridge(id) {
    try {
        const fridge = await db.fridge.destroy({
            where: {
                id: id
            }
        });
        return fridge;
    } catch (error) {
        throw error;
    }
}

async function GetAllFridges() {
    try {
        const fridges = await db.fridge.findAll();
        return fridges;
    } catch (error) {
        throw error;
    }
}

async function GetFridgeById(id) {
    try {
        const fridge = await db.fridge.findOne({
            where: {
                id: id
            }
        });
        return fridge;
    } catch (error) {
        throw error;
    }
}

async function GetFridgeIdByFridgeKey(fridgeKey) {
    try {
        const fridge = await db.fridge.findOne({
            where: {
                fridgeKey: fridgeKey
            }
        });
        return fridge;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    CreateFridge,
    DeleteFridge,
    GetAllFridges,
    GetFridgeById,
    GetFridgeIdByFridgeKey
}