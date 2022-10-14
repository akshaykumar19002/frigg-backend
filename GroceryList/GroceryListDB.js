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

// TODO: change the reference in the db. replace name in 
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
            console.log("in if");

                console.log(groceryListItem.quantity);
                groceryListItem.quantity = parseFloat(groceryListItem.quantity) - 1;
                await groceryListItem.save();
                console.log(groceryListItem);
                return groceryListItem;
            } else {
            console.log("in else");

                console.log(groceryListItem);
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



module.exports = {
    GetGroceryListByFridgeId,
    AddOrIncreaseGroceryItemQuantityByOne,
    ReduceGroceryItemQuantityByOneOrDelete
}