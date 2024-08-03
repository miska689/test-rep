import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {router} from './router/index.js'
import {sequelizeClient} from './sequelize.js'
import models from './models/index.js'
import {errorHandling} from './middleware/errorHandlingMiddleware.js'
import {startBot} from "./tel-bot-service/index.js";
import helmet from "helmet"
import morgan from "morgan"
import {rateLimitAndTimeout} from "./middleware/timeOutMiddleware.js"
import routs from './router/routes.js'
import { createProxyMiddleware } from "http-proxy-middleware"
import {telegramAuthMiddleware} from "./middleware/telegramMiddlewareAuth.js"

dotenv.config({path: `.${process.env.NODE_ENV}.env`})

const app = express()
const PORT = process.env.PORT_HOST || 6000

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"));
app.use('/api', router)
app.disable("x-powered-by");

routs.forEach(({ route, target }) => {
    // Proxy options
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    };

    app.use('/api' + route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

app.use((_req, res) => {
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Route not found.",
        data: null,
    });
});


app.use(errorHandling);

const start = async () => {
    try{
        const connection = await sequelizeClient();

        app.listen(PORT, () => {
            startBot(bot => {
                console.log(`Bot is ready to use`);
            })
            console.log(`Listening on port ${PORT}`)
        })
    } catch (e) {
        console.error(e)
    }
}

start()

