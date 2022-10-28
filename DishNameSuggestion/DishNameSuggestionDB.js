const sequelize = require('sequelize');
const db = require('../Config/db');

async function partialSearch(name) {
    try {
        const dishes = await db.recipe_lists.findAll({
            attributes: ['recipe_name'],
            where: {
                recipe_name: {
                    [sequelize.Op.like]: `%${name}%`
                }
            }
        });
        return dishes;
    } catch (error) {
        console.log(error);
    }
}

async function fetchAll() {
    try {
        const dishes = await db.recipe_lists.findAll();
        return dishes;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    partialSearch,
    fetchAll
}