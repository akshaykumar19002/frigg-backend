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

module.exports = {
    CreateGroceryItem
}