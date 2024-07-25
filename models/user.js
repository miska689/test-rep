import {DataTypes} from "@sequelize/core";
import sequelize from "../db/dbConf.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    telegram_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },

    telegram_chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }

})

export default User;