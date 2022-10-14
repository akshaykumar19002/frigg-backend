const db = require('../Config/db');

async function CreateFridge(name) {
    try {
        const fridge = await db.fridge.findOne({
            where: {
                name: name
            },
            paranoid: false,
        });
        if (fridge) {
            fridge.restore();
            await fridge.save();
            return fridge;
        } else {
            const fridge = await db.fridge.create({
                name: name
            });
            return fridge;
        }
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
}

async function GetAllFridges() {
    try {
        const fridges = await db.fridge.findAll();
        return fridges;
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
}

module.exports = {
    CreateFridge,
    DeleteFridge,
    GetAllFridges,
    GetFridgeById
}