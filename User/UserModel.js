const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invite_code: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        
    }, {
        paranoid: true,
        underscored: true
    });
    User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    });
    User.prototype.verifyPassword = function (password) {
        return bcrypt.compare(password, this.password);
    };


    return User;
};