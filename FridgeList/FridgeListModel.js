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