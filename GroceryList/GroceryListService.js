const GroceryListDB = require('./GroceryListDB');
const FoodItemDB = require('../FoodItem/FoodItemDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}

var GroceryService = {
    GetAllGroceryListByFridgeId: async function (fridgeId) {
        try {
            let groceryList = await GroceryListDB.GetGroceryListByFridgeId(fridgeId);
            if (groceryList === undefined || groceryList.length === 0) {
                return {
                    message: "No item in grocery list"
                }
            }
            groceryList.forEach(groceryListItem => {
                DeleteProperties(groceryListItem);
                groceryListItem.dataValues.food_item_name = groceryListItem.dataValues.food_item.name;
                delete groceryListItem.dataValues.food_item;
            });
            return groceryList;
        } catch (error) {
            throw error;
        }
    },
    AddFoodItem: async function (fridgeId, foodItemId, quantity) {
        try {
            let groceryItem = await GroceryListDB.GetGroceryListByFridgeIdAndFoodItemId(fridgeId, foodItemId);
            if (groceryItem !== undefined && groceryItem !== null) {
                await GroceryListDB.SetQuantityForGroceryList(fridgeId, groceryItem.id, quantity + parseInt(groceryItem.quantity));
            } else {
                await GroceryListDB.CreateOrRestoreFoodItemInGroceryList(fridgeId, newFoodItem.id, quantity);
            }
            return {
                message: "Item added"
            }
        } catch (error) {
            throw error;
        }
    },
    AddFoodItemByName: async function (fridgeId, foodItemName, quantity) {
        try {
            let foodItem = await FoodItemDB.GetFoodItemByName(foodItemName);
            if (foodItem !== undefined && foodItem !== null) {
                let groceryItem = await GroceryListDB.GetGroceryListByFridgeIdAndFoodItemId(fridgeId, foodItem.id);
                if (groceryItem !== undefined && groceryItem !== null) {
                    await GroceryListDB.SetQuantityForGroceryList(fridgeId, foodItem.id, quantity + parseInt(groceryItem.quantity));
                } else {
                    await GroceryListDB.CreateOrRestoreFoodItemInGroceryList(fridgeId, foodItem.id, quantity + parseInt(groceryItem.quantity));
                }
            } else {
                let newFoodItem = await FoodItemDB.CreateFoodItem(foodItemName, 7);
                await GroceryListDB.CreateOrRestoreFoodItemInGroceryList(fridgeId, newFoodItem.id, quantity);
            }
            return {
                message: "Item added"
            }
        } catch (error) {
            throw error;
        }
    },
    DeleteFoodItem: async function (fridgeId, foodItemId) {
        try {
            var isDeleted = await GroceryListDB.DeleteFoodItemInGroceryList(fridgeId, foodItemId);
            if (!isDeleted) {
                return {
                    message: "Item already doesn't exist in the grocery list"
                }
            } else {
                return {
                    message: "Item deleted"
                }
            }
        } catch (error) {
            throw error;
        }
    },
    UpdateGroceryListByFoodItemslist: async function (fridgeId, foodItemsToBeAdded) {
        try {
            const groceryListFromDB = await GroceryListDB.GetGroceryListByFridgeId(fridgeId);

            if (groceryListFromDB !== undefined && groceryListFromDB !== null) {
                for (let i = 0; i < groceryListFromDB.length; i++) {
                    const dBFoodItemFoundInInputList = foodItemsToBeAdded.find(foodItem => foodItem.food_item_id === parseInt(groceryListFromDB[i].food_item_id) && foodItem.expected_expiry_days === groceryListFromDB[i].expected_expiry_days && foodItem.purchase_date === groceryListFromDB[i].purchase_date);
                    if (dBFoodItemFoundInInputList !== undefined && dBFoodItemFoundInInputList !== null) {
                        await GroceryListDB.SetQuantityForGroceryList(fridgeId, groceryListFromDB[i].food_item_id, dBFoodItemFoundInInputList.quantity)
                    } else {
                        await GroceryListDB.DeleteFoodItemInGroceryList(fridgeId, groceryListFromDB[i].food_item_id);
                    }
                }
                for (let i = 0; i < foodItemsToBeAdded.length; i++) {
                    const foodItemFoundInDB = groceryListFromDB.find(foodItem => foodItem.food_item_id === parseInt(foodItemsToBeAdded[i].food_item_id) && foodItem.expected_expiry_days === foodItemsToBeAdded[i].expectedExpiry_days && foodItem.purchase_date === foodItemsToBeAdded[i].purchase_date);
                    if (foodItemFoundInDB === undefined || foodItemFoundInDB === null) {
                        await GroceryListDB.CreateOrRestoreFoodItemInGroceryList(fridgeId, foodItemsToBeAdded[i].food_item_id, parseInt(foodItemsToBeAdded[i].quantity));
                    }
                }
                return true;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;