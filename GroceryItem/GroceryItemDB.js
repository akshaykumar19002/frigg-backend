const sequelize = require('sequelize');
const GroceryItem = require('./GroceryItemModel');

async function CreateGroceryItem(name) {
    try {
        const groceryItem = await GroceryItem.create({
            name: name,
        });
        return groceryItem;
    } catch (error) {
        console.log(error);
    }
}

async function DeleteGroceryItem(id) {
    try {
        const groceryItem = await GroceryItem.destroy({
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
        const groceryItems = await GroceryItem.findAll();
        return groceryItems;
    } catch (error) {
        console.log(error);
    }
}

async function GetGroceryItemById(id) {
    try {
        const groceryItem = await GroceryItem.findByPk(id);
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