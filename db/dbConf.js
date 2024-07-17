import dotenv from 'dotenv'
import {Sequelize} from "@sequelize/core";
import {PostgresDialect} from "@sequelize/postgres";

dotenv.config({path: `.${process.env.NODE_ENV}.env`})

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: false,
    clientMinMessages: 'notice',
});

export default sequelize;