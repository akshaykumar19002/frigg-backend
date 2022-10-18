const db = require('../Config/db')

async function AddOrIncreaseGroceryItemQuantityByOne(fridgeId, groceryItemId) {
    try {
        const groceryList = await db.grocery_list.findOne({
            where: {
                fridge_id: fridgeId,
                grocery_item_id: groceryItemId
            },
            paranoid: false
        });
        if (groceryList) {
            if(groceryList.deletedAt === null) {
                groceryList.quantity = parseFloat(groceryList.quantity) + 1;
                await groceryList.save();
                return groceryList;
            } else {
                await groceryList.restore();
                await groceryList.save();
                return groceryList;
            }
        } else {
            const groceryList = await db.grocery_list.create({
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
        const groceryList = await db.grocery_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            include: [{
                model: db.grocery_item,
                attributes: ['name']
            }]
        });
        return groceryList;
    } catch (error) {
        console.log(error);
    };
};

async function ReduceGroceryItemQuantityByOneOrDelete(fridgeId, groceryItemId) {
    try {
        const groceryListItem = await db.grocery_list.findOne({
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
                return groceryListItem;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    };
};

// TODO: when i get the groceryitemlist, change the type of quantity from string to int
async function UpdateGroceryListByFridgeIdAndGroceryItemslist(fridgeId, groceryItemsList) {
    try {
        const groceryList = await db.grocery_list.findAll({
            where: {
                fridge_id: fridgeId
            }
        });
        if (groceryList !== undefined && groceryList !== null) {
            for (let i = 0; i < groceryList.length; i++) {
                const groceryItem = groceryItemsList.find(groceryItem => groceryItem.grocery_item_id === parseInt(groceryList[i].grocery_item_id));
                if (groceryItem !== undefined && groceryItem !== null) {
                    groceryList[i].quantity = parseInt(groceryItem.quantity);
                    await groceryList[i].save();
                } else {
                    await groceryList[i].destroy();
                }
            }
            for (let i = 0; i < groceryItemsList.length; i++) {
                const groceryItem = groceryList.find(groceryItem => groceryItem.grocery_item_id === parseInt(groceryItemsList[i].grocery_item_id));
                if (groceryItem === undefined || groceryItem === null) {
                    await db.grocery_list.create({
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
    GetGroceryListByFridgeId,
    AddOrIncreaseGroceryItemQuantityByOne,
    ReduceGroceryItemQuantityByOneOrDelete,
    UpdateGroceryListByFridgeIdAndGroceryItemslist
}