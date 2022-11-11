const db = require('../Config/db');
const sequelize = require('sequelize');
// let fridgeList =  sequelize.define('fridge_list', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     fridge_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     food_item_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.DECIMAL,
//         allowNull: false
//     },
//     purchase_date: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     expected_expiry_date: {
//         type: DataTypes.DATE,
//         allowNull: true
//     }
// }, {
//     underscored: true,
//     paranoid: true,
// });

// const recipe = sequelize.define('recipe_lists', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     recipe_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     ingredients: {
//         type: DataTypes.STRING
//     },
//     type: {
//         type: DataTypes.STRING
//     },
//     calorie_count: {
//         type: DataTypes.INTEGER
//     },
//     is_healthy: {
//         type: DataTypes.BOOLEAN
//     }
// }, {
//     paranoid: true,
//     underscored: true
// });
// const FoodItem = sequelize.define('food_item', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     expected_expiry_days: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     paranoid: true,
//     underscored: true
// });

async function GetFoodItemsInFridge(fridgeId) {
    try {
        let sql = "SELECT distinct(fi.name) FROM frigg.fridge_lists as fl inner join frigg.food_items as fi on fl.food_item_id = fi.id where fridge_id = " + fridgeId;
        let food_names = await db.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        });
        
        let recepie_list_names = [];
        for (let i = 0; i < food_names.length; i++) {
            const element = food_names[i];
            let sql2 = "select * from recipes where ingredients like '%" + element.name + "%'";
            let recepie_list = await db.sequelize.query(sql2, {
                type: sequelize.QueryTypes.SELECT
            });
            recepie_list_names.push(...recepie_list.map(x => x.recipe_name));
        }
        
        return recepie_list_names.filter((v, i, a) => a.indexOf(v) === i);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    GetFoodItemsInFridge
};
