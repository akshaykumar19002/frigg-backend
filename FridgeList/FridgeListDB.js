const db = require('../Config/db');

async function AddOrIncreaseGroceryItemQuantityByOne(fridgeId, groceryItemId) {
    try {
        const groceryListItem = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId
            },
            paranoid: false
        });
        if (groceryListItem) {
            if(groceryListItem.deletedAt === null) {
                groceryListItem.quantity = parseFloat(groceryListItem.quantity) + 1;
                await groceryListItem.save();
                return groceryListItem;
            } else {
                await groceryListItem.restore();
                groceryListItem.quantity = 1;
                await groceryListItem.save();
                return groceryListItem;
            }
        } else {
            const groceryItem = await db.fridge_list.create({
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId,
                quantity: 1
            });
            return groceryItem;
        }
    } catch (error) {
        console.log(error);
    };
};

async function GetFridgeListByFridgeId(fridgeId) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            include: [{
                model: db.grocery_item,
                attributes: ['name']
            }]
        });
        return fridgeList;
    } catch (error) {
        console.log(error);
    };
};

async function ReduceGroceryItemQuantityByOneOrDelete(fridgeId, groceryItemId) {
    try {
        const groceryListItem = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId
            }
        });
        if (groceryListItem !== undefined && groceryListItem !== null) {
            if( parseFloat(groceryListItem.quantity) > 1) {
                groceryListItem.quantity = parseFloat(groceryListItem.quantity) - 1;
                await groceryListItem.save();
                return groceryListItem;
            } else {
                await groceryListItem.destroy();
                return true;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    };
};

// TODO: when i get the groceryitemlist, change the type of quantity from string to int
async function UpdateFridgeListByFridgeIdAndGroceryItemslist(fridgeId, groceryItemsList) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            paranoid: false
        });
        if (fridgeList !== undefined && fridgeList !== null) {
            for (let i = 0; i < fridgeList.length; i++) {
                const groceryItem = groceryItemsList.find(groceryItem => groceryItem.grocery_item_id === parseInt(fridgeList[i].grocery_item_id));
                if (groceryItem !== undefined && groceryItem !== null) {
                    if(fridgeList[i].deletedAt === null) {
                        fridgeList[i].quantity = parseInt(groceryItem.quantity);
                        await fridgeList[i].save();
                    } else {
                        await fridgeList[i].restore();
                        fridgeList[i].quantity = parseInt(groceryItem.quantity);
                        await fridgeList[i].save();
                    }
                } else {
                    await fridgeList[i].destroy();
                }
            }
            for (let i = 0; i < groceryItemsList.length; i++) {
                const groceryItem = fridgeList.find(groceryItem => groceryItem.grocery_item_id === parseInt(groceryItemsList[i].grocery_item_id));
                if (groceryItem === undefined || groceryItem === null) {
                    await db.fridge_list.create({
                        fridge_id: fridgeId,
                        grocery_item_id: groceryItemsList[i].grocery_item_id,
                        quantity: parseInt(groceryItemsList[i].quantity)
                    });
                }
            }
            return true;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    };
};


module.exports = {
    GetFridgeListByFridgeId,
    AddOrIncreaseGroceryItemQuantityByOne,
    ReduceGroceryItemQuantityByOneOrDelete,
    UpdateFridgeListByFridgeIdAndGroceryItemslist
}