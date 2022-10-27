const FridgeListDB = require('./FridgeListDB');
const FoodItemDB = require('../FoodItem/FoodItemDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}
var GroceryService = {
    GetAllFridgeListByFridgeId: async function (fridgeId) {
        try {
            let fridgeList = await FridgeListDB.GetFridgeListByFridgeId(fridgeId);
            if (fridgeList === undefined || fridgeList.length === 0) {
                return {
                    message: "No item in fridge list"
                }
            }
            console.log(fridgeList.length);
            fridgeList.forEach(groceryListItem => {
                DeleteProperties(groceryListItem);
                groceryListItem.dataValues.food_item_name = groceryListItem.dataValues.food_item.name;
                delete groceryListItem.dataValues.food_item;
            });
            return fridgeList;
        } catch (error) {
            throw error;
        }
    },
    AddFoodItem: async function (fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
        try {
            const fridgeList = await FridgeListDB.GetFridgeListByCriteria(fridgeId, foodItemId, purchaseDate, expectedExpiryDate);
            if (fridgeList !== undefined && fridgeList !== null) {
                await FridgeListDB.SetQuantityForFridgeList(fridgeId, foodItemId, parseInt(quantity) + parseInt(fridgeList.quantity), purchaseDate, expectedExpiryDate);

            } else {
                await FridgeListDB.CreateOrRestoreFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate);
            }
            return {
                message: "Food item added to Fridge"
            }
        } catch (error) {
            throw error;
        }
    },
    AddFoodItemByName: async function (fridgeId, foodItemName, quantity, purchaseDate, expectedExpiryDate) {
        try {
            let foodItem = await FoodItemDB.GetFoodItemByName(foodItemName);
            if (foodItem !== undefined && foodItem !== null) {
                let fridgeListItem = await FridgeListDB.GetFridgeListByCriteria(fridgeId, foodItem.id, purchaseDate, expectedExpiryDate);
                if (fridgeListItem !== undefined && fridgeListItem !== null) {
                    await FridgeListDB.SetQuantityForFridgeList(fridgeId, foodItem.id, quantity + parseInt(fridgeListItem.quantity), purchaseDate, expectedExpiryDate);
                } else {
                    await FridgeListDB.CreateOrRestoreFoodItemInFridgeList(fridgeId, foodItem.id, quantity + parseInt(fridgeListItem.quantity), purchaseDate, expectedExpiryDate);
                }
            } else {
                let newFoodItem = await FoodItemDB.CreateFoodItem(foodItemName, 7);
                await FridgeListDB.CreateOrRestoreFoodItemInFridgeList(fridgeId, newFoodItem.id, quantity, purchaseDate, expectedExpiryDate);
            }
            return {
                message: "Item added"
            }
        } catch (error) {
            throw error;
        }
    },
    UpdateFridgeListByFoodItemslist: async function (fridgeId, foodItemsToBeAdded) {
        try {
            let fridgeItemsFromDB = await FridgeListDB.GetFridgeListByFridgeId(fridgeId);
            for (let i = 0; i < fridgeItemsFromDB.length; i++) {
                const dbFoodItemFoundInInputList = foodItemsToBeAdded.find(foodItem => foodItem.food_item_id === parseInt(fridgeItemsFromDB[i].food_item_id) && foodItem.expected_expiry_date === fridgeItemsFromDB[i].expected_expiry_date && foodItem.purchase_date === fridgeItemsFromDB[i].purchase_date);
                if (dbFoodItemFoundInInputList === undefined || dbFoodItemFoundInInputList === null) {
                    // item not found in the list should be deleted.
                    console.log(fridgeId, fridgeItemsFromDB[i].food_item_id, fridgeItemsFromDB[i].quantity, fridgeItemsFromDB[i].purchase_date, fridgeItemsFromDB[i].expected_expiry_date)
                    await FridgeListDB.DeleteFoodItemFromFridgeList(fridgeId, fridgeItemsFromDB[i].food_item_id, fridgeItemsFromDB[i].purchase_date, fridgeItemsFromDB[i].expected_expiry_date);
                }
                else 
                {
                    // update new quantity
                    await FridgeListDB.UpdateFridgeListQuantityByCriteria(fridgeId, fridgeItemsFromDB[i].food_item_id, fridgeItemsFromDB[i].quantity, fridgeItemsFromDB[i].purchase_date, fridgeItemsFromDB[i].expected_expiry_date);
                }
            }
            for (let i = 0; i < foodItemsToBeAdded.length; i++) {
                const foodItemFoundInDB = fridgeItemsFromDB.find(foodItem => foodItem.food_item_id === parseInt(foodItemsToBeAdded[i].food_item_id) && foodItem.expected_expiry_date === foodItemsToBeAdded[i].expected_expiry_date && foodItem.purchase_date === foodItemsToBeAdded[i].purchase_date);
                if (foodItemFoundInDB === undefined || foodItemFoundInDB === null) {
                    await FridgeListDB.CreateOrRestoreFoodItemInFridgeList(fridgeId, foodItemsToBeAdded[i].food_item_id, foodItemsToBeAdded[i].quantity, foodItemsToBeAdded[i].purchase_date, foodItemsToBeAdded[i].expected_expiry_date);
                }
            }
            return true;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

};


module.exports = GroceryService;