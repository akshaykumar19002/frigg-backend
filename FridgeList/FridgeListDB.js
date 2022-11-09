const db = require('../Config/db');

async function GetFridgeListByFridgeId(fridgeId) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            include: [{
                model: db.food_item,
                attributes: ['name']
            }],
            order: [
                ['expected_expiry_date', 'ASC']
            ]
        });
        return fridgeList;
    } catch (error) {
        throw error;
    };
};
async function GetFridgeListByCriteria(fridgeId, foodItemId, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeItem = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            },
            include: [{
                model: db.food_item,
                attributes: ['name']
            }]
        });
        return fridgeItem;
    } catch (error) {
        throw error;
    };
};
async function GetFridgeListByFridgeIdAndFoodItemId(fridgeId, foodItemId) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId
            },
            include: [{
                model: db.food_item,
                attributes: ['name']
            }]
        });
        return fridgeList;
    } catch (error) {
        throw error;
    };
};

async function AddFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {

    } catch (error) {
        throw error;
    };
};

async function CreateOrRestoreFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            },
            paranoid: false
        });
        if (fridgeList !== undefined && fridgeList !== null) {
            await fridgeList.restore();
            fridgeList.quantity = parseInt(quantity);
            await fridgeList.save();
        } else {
            await db.fridge_list.create({
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                quantity: quantity,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            });
        }
        return true;
    } catch (error) {
        throw error;
    };
};
async function CreateFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {
        await db.fridge_list.create({
            fridge_id: fridgeId,
            food_item_id: foodItemId,
            quantity: quantity,
            purchase_date: purchaseDate,
            expected_expiry_date: expectedExpiryDate
        });
        return true;
    } catch (error) {
        throw error;
    };
};
async function DeleteFoodItemFromFridgeList(fridgeId, foodItemId, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            }
        });
        await fridgeList.destroy();
        return true;
    } catch (error) {
        throw error;
    };
};
async function SetQuantityForFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            }
        });
        fridgeList.quantity = parseInt(quantity);
        await fridgeList.save();
        return true;
    } catch (error) {
        throw error;
    };
};



module.exports = {
    GetFridgeListByFridgeId,
    AddFoodItemInFridgeList,
    CreateFoodItemInFridgeList,
    CreateOrRestoreFoodItemInFridgeList,
    GetFridgeListByFridgeIdAndFoodItemId,
    DeleteFoodItemFromFridgeList,
    SetQuantityForFridgeList,
    GetFridgeListByCriteria
}