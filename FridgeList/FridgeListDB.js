const db = require('../Config/db');

async function AddOrIncreaseFoodItemQuantityByOne(fridgeId, foodItemId) {
    try {
        const groceryListItem = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId
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
            const foodItem = await db.fridge_list.create({
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                quantity: 1
            });
            return foodItem;
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
                model: db.food_item,
                attributes: ['name']
            }]
        });
        return fridgeList;
    } catch (error) {
        console.log(error);
    };
};

async function ReduceFoodItemQuantityByOneOrDelete(fridgeId, foodItemId) {
    try {
        const groceryListItem = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId
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

// TODO: when i get the fooditemlist, change the type of quantity from string to int
async function UpdateFridgeListByFridgeIdAndFoodItemslist(fridgeId, foodItemsList) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            paranoid: false
        });
        if (fridgeList !== undefined && fridgeList !== null) {
            for (let i = 0; i < fridgeList.length; i++) {
                const foodItem = foodItemsList.find(foodItem => foodItem.food_item_id === parseInt(fridgeList[i].food_item_id));
                if (foodItem !== undefined && foodItem !== null) {
                    if(fridgeList[i].deletedAt === null) {
                        fridgeList[i].quantity = parseInt(foodItem.quantity);
                        await fridgeList[i].save();
                    } else {
                        await fridgeList[i].restore();
                        fridgeList[i].quantity = parseInt(foodItem.quantity);
                        await fridgeList[i].save();
                    }
                } else {
                    await fridgeList[i].destroy();
                }
            }
            for (let i = 0; i < foodItemsList.length; i++) {
                const foodItem = fridgeList.find(foodItem => foodItem.food_item_id === parseInt(foodItemsList[i].food_item_id));
                if (foodItem === undefined || foodItem === null) {
                    await db.fridge_list.create({
                        fridge_id: fridgeId,
                        food_item_id: foodItemsList[i].food_item_id,
                        quantity: parseInt(foodItemsList[i].quantity)
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
    AddOrIncreaseFoodItemQuantityByOne,
    ReduceFoodItemQuantityByOneOrDelete,
    UpdateFridgeListByFridgeIdAndFoodItemslist
}