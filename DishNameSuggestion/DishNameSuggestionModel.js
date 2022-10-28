module.exports = (sequelize, DataTypes) => {
    const RECIPE = sequelize.define('recipe_lists', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ingredients: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        calorie_count: {
            type: DataTypes.INTEGER
        },
        is_healthy: {
            type: DataTypes.BOOLEAN
        }
    }, {
        paranoid: true,
        underscored: true
    });

    return RECIPE;
};