import {DataTypes} from "@sequelize/core";
import sequelize from "../db/dbConf.js";

const Appointment = sequelize.define("appointment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

export default Appointment;