import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {router} from './router/index.js'
import {sequelizeClient} from './sequelize.js'
import models from './models/index.js'
import {errorHandling} from './middleware/errorHandlingMiddleware.js'
import {notFoundHandling} from "./middleware/notFoundHandling.js";
import {startBot} from "./tel-bot-service/index.js";


dotenv.config({path: `.${process.env.NODE_ENV}.env`})

const app = express()
const PORT = process.env.PORT_HOST || 6000

app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use('*', notFoundHandling)


app.use(errorHandling);

const start = async () => {
    try{
        const connection = await sequelizeClient();

        app.listen(PORT, () => {
            // startBot(bot => {
            //     console.log(`Bot is ready to use`);
            // })
            console.log(`Listening on port ${PORT}`)
        })
    } catch (e) {
        console.error(e)
    }
}

start()

