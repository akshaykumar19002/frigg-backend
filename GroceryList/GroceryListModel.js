module.exports = (sequelize, DataTypes) => {
    return sequelize.define('grocery_list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        grocery_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        underscored: true,
        paranoid: true,
    });
}