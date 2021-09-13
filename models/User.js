const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connections');

class User extends Model {
    checkPassword(loginPw) {
        return brypt.compareSync(loginPw, this.password);
    }
}