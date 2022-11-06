const { v4: uuidv4, v1: uuidv1 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Fridge = sequelize.define('fridge', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridgeKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            defaultValue: () => {
                let key = '';
                for (let i = 0; i < 6; i++) {
                    key += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                }
                return key;
            }
        }
    }, {
        paranoid: true,
        underscored: true
    });

    return Fridge;
};