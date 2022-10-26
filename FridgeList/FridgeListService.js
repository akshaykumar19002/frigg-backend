const FridgeItemDB = require('./FridgeListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('fridge_list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        food_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        expected_expiry_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        underscored: true,
        paranoid: true,
    });
}
var GroceryService = {
    GetAllFridgeListByFridgeId: async function (fridgeId) {
        try {
            let fridgeList = await FridgeItemDB.GetFridgeListByFridgeId(fridgeId);
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
            var foodItemAdded = await FridgeItemDB.AddFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate);
            if (foodItemAdded) {
                return {
                    message: "Food item added to Fridge"
                }
            }
            return {
                message: "Food item not added"
            }
        } catch (error) {
            throw error;
        }
    },
    UpdateFridgeListByFoodItemslist: async function (fridgeId, foodItemsToBeAdded) {
        try {
            let fridgeItemsFromDB = await FridgeItemDB.GetFridgeListByFridgeId(fridgeId);
            for (let i = 0; i < fridgeItemsFromDB.length; i++) {
                const dbFoodItemFoundInInputList = foodItemsToBeAdded.find(foodItem => foodItem.food_item_id === parseInt(fridgeItemsFromDB[i].food_item_id) && foodItem.expected_expiry_date === fridgeItemsFromDB[i].expected_expiry_date && foodItem.purchase_date === fridgeItemsFromDB[i].purchase_date);
                if (dbFoodItemFoundInInputList === undefined || dbFoodItemFoundInInputList === null) {
                    // item not found in the list should be deleted.
                    console.log(fridgeId, fridgeItemsFromDB[i].food_item_id, fridgeItemsFromDB[i].quantity, fridgeItemsFromDB[i].purchase_date, fridgeItemsFromDB[i].expected_expiry_date)
                    await FridgeItemDB.DeleteFoodItemFromFridgeList(fridgeId, fridgeItemsFromDB[i].food_item_id, fridgeItemsFromDB[i].purchase_date, fridgeItemsFromDB[i].expected_expiry_date);
                }
                else 
                {
                    // update new quantity
                    await FridgeItemDB.UpdateFridgeListQuantityByCriteria(fridgeId, fridgeItemsFromDB[i].food_item_id, fridgeItemsFromDB[i].quantity, fridgeItemsFromDB[i].purchase_date, fridgeItemsFromDB[i].expected_expiry_date);
                }
            }
            for (let i = 0; i < foodItemsToBeAdded.length; i++) {
                const foodItemFoundInDB = fridgeItemsFromDB.find(foodItem => foodItem.food_item_id === parseInt(foodItemsToBeAdded[i].food_item_id) && foodItem.expected_expiry_date === foodItemsToBeAdded[i].expected_expiry_date && foodItem.purchase_date === foodItemsToBeAdded[i].purchase_date);
                if (foodItemFoundInDB === undefined || foodItemFoundInDB === null) {
                    await FridgeItemDB.CreateOrRestoreFoodItemInFridgeList(fridgeId, foodItemsToBeAdded[i].food_item_id, foodItemsToBeAdded[i].quantity, foodItemsToBeAdded[i].purchase_date, foodItemsToBeAdded[i].expected_expiry_date);
                }
            }
            return true;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

};

async function UpdateFridgeListByFridgeIdAndFoodItemslist(fridgeId, foodItemsList) {
    try {
        // const fridgeList = await db.fridge_list.findAll({
        //     where: {
        //         fridge_id: fridgeId,
        //     },
        //     paranoid: false
        // });
        if (fridgeList !== undefined && fridgeList !== null) {
            for (let i = 0; i < fridgeList.length; i++) {
                const foodItem = foodItemsList.find(foodItem => foodItem.food_item_id === parseInt(fridgeList[i].food_item_id) && foodItem.expected_expiry_date === fridgeList[i].expected_expiry_date && foodItem.purchase_date === fridgeList[i].purchase_date);
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
                const foodItem = fridgeList.find(foodItem => foodItem.food_item_id === parseInt(foodItemsList[i].food_item_id) && foodItem.expected_expiry_date === foodItemsList[i].expected_expiry_date && foodItem.purchase_date === foodItemsList[i].purchase_date);
                if (foodItem === undefined || foodItem === null) {
                    await db.fridge_list.create({
                        fridge_id: fridgeId,
                        food_item_id: foodItemsList[i].food_item_id,
                        quantity: parseInt(foodItemsList[i].quantity),
                        expected_expiry_date: foodItemsList[i].expected_expiry_date,
                        purchase_date: foodItemsList[i].purchase_date
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

module.exports = GroceryService;