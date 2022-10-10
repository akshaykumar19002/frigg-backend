const sequelize = require('sequelize');
const GroceryList = require('./GroceryListModel');

async function AddOrIncreaseGroceryItemQuantityByOne(fridgeId, groceryItemId) {
    try {
        const groceryList = await GroceryList.findOne({
            where: {
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId
            }
        })
        if (groceryList) {
            groceryList.quantity += 1;
            await groceryList.save();
            return groceryList;
        } else {
            const groceryList = await GroceryList.create({
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId,
                quantity: 1
            });
            return groceryList;
        }
    } catch (error) {
        console.log(error);
    };
};

async function GetGroceryListByFridgeId(fridgeId) {
    try {
        const groceryList = await GroceryList.findAll({
            where: {
                fridge_id: fridgeId
            }
        });
        return groceryList;
    } catch (error) {
        console.log(error);
    };
};

async function ReduceGroceryItemQuantityByOneOrDelete(fridgeId, groceryItemId) {
    try {
        const groceryList = await GroceryList.findOne({
            where: {
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId
            }
        });
        if (groceryList.quantity > 1) {
            groceryList.quantity -= 1;
            await groceryList.save();
            return groceryList;
        } else {
            await groceryList.destroy();
            return null;
        }
    } catch (error) {
        console.log(error);
    };
};



module.exports = {
    GetGroceryListByFridgeId,
    AddOrIncreaseGroceryItemQuantityByOne,
    ReduceGroceryItemQuantityByOneOrDelete
}