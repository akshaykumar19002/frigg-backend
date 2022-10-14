const sequelize = require('sequelize');
const db = require('../Config/db');

async function CreateGroceryItem(name) {
    try {
        const groceryItem = await db.grocery_item.findOne({
            where: {
                name: name
            },
            paranoid: false,
        });
        if (groceryItem) {
            groceryItem.restore();
            return groceryItem;
        }
    } catch (error) {
        console.log(error);
    }
}

async function DeleteGroceryItem(id) {
    try {
        const groceryItem = await db.grocery_item.destroy({
            where: {
                id: id
            }
        });
        return groceryItem;
    } catch (error) {
        console.log(error);
    }
}

async function GetAllGroceryItems() {
    try {
        const groceryItems = await db.grocery_item.findAll();
        return groceryItems;
    } catch (error) {
        console.log(error);
    }
}

async function GetGroceryItemById(id) {
    try {
        const groceryItem = await db.grocery_item.findByPk(id);
        return groceryItem;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    CreateGroceryItem,
    DeleteGroceryItem,
    GetAllGroceryItems,
    GetGroceryItemById
}