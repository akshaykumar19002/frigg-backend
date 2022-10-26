const db = require('../Config/db')

async function GetGroceryListByFridgeId(fridgeId) {
    try {
        const groceryList = await db.grocery_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            include: [{
                model: db.food_item,
                attributes: ['name']
            }]
        });
        return groceryList;
    } catch (error) {
        console.log(error);
    };
};

// TODO: when i get the fooditemlist, change the type of quantity from string to int
async function UpdateGroceryListByFridgeIdAndFoodItemslist(fridgeId, foodItemsList) {
    try {
        const groceryList = await db.grocery_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            paranoid: false
        });
        if (groceryList !== undefined && groceryList !== null) {
            for (let i = 0; i < groceryList.length; i++) {
                const foodItem = foodItemsList.find(foodItem => foodItem.food_item_id === parseInt(groceryList[i].food_item_id) && foodItem.expected_expiry_days === groceryList[i].expected_expiry_days && foodItem.purchase_date === groceryList[i].purchase_date);
                if (foodItem !== undefined && foodItem !== null) {
                    if(groceryList[i].deletedAt === null) {
                        groceryList[i].quantity = parseInt(foodItem.quantity);
                        await groceryList[i].save();
                    } else {
                        await groceryList[i].restore();
                        groceryList[i].quantity = parseInt(foodItem.quantity);
                        await groceryList[i].save();
                    }
                } else {
                    await groceryList[i].destroy();
                }
            }
            for (let i = 0; i < foodItemsList.length; i++) {
                const foodItem = groceryList.find(foodItem => foodItem.food_item_id === parseInt(foodItemsList[i].food_item_id) && foodItem.expected_expiry_days === foodItemsList[i].expectedExpiry_days && foodItem.purchase_date === foodItemsList[i].purchase_date);
                if (foodItem === undefined || foodItem === null) {
                    await db.grocery_list.create({
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
}

async function AddFoodItemInGroceryList(fridgeId, food_item_id, quantity) {
    try {
        const groceryItem = await db.grocery_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: food_item_id
            },
            paranoid: false
        });
        if (groceryItem !== undefined && groceryItem !== null) {
            if(groceryItem.deletedAt === null) {
                groceryItem.quantity = parseInt(groceryItem.quantity) + parseInt(quantity);
                await groceryItem.save();
            } else {
                await groceryItem.restore();
                groceryItem.quantity = parseInt(quantity);
                await groceryItem.save();
            }
        } else {
            await db.grocery_list.create({
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                quantity: parseInt(quantity)
            });
        }
        return true;
    } catch (error) {
        console.log(error);
    };
};

async function AddFoodItemInGroceryListByName(fridgeId, foodItemName, quantity) {
    try {
        const foodItem = await db.food_item.findOne({
            where: {
                name: foodItemName
            }
        });
        if (foodItem !== undefined && foodItem !== null) {
            const groceryItem = await db.grocery_list.findOne({
                where: {
                    fridge_id: fridgeId,
                    food_item_id: foodItem.id
                },
                paranoid: false
            });
            if (groceryItem !== undefined && groceryItem !== null) {
                if(groceryItem.deletedAt === null) {
                    groceryItem.quantity = parseInt(groceryItem.quantity) + parseInt(quantity);
                    await groceryItem.save();
                } else {
                    await groceryItem.restore();
                    groceryItem.quantity = parseInt(quantity);
                    await groceryItem.save();
                }
            } else {
                await db.grocery_list.create({
                    fridge_id: fridgeId,
                    food_item_id: foodItem.id,
                    quantity: parseInt(quantity)
                });
            }
            return true;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    };
};

async function DeleteFoodItemInGroceryList(fridgeId, foodItemId) {
    try {
        const groceryList = await db.grocery_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId
            }
        });
        if (groceryList !== undefined && groceryList !== null) {
            await groceryList.destroy();
        }
        return true;
    } catch (error) {
        console.log(error);
    };
};



module.exports = {
    GetGroceryListByFridgeId,
    AddFoodItemInGroceryListByName,
    UpdateGroceryListByFridgeIdAndFoodItemslist,
    AddFoodItemInGroceryList,
    DeleteFoodItemInGroceryList
}