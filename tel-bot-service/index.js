import TelegramBot from 'node-telegram-bot-api'
import { initCommands } from './commands/commands.js';
import { initQueryDataEffect } from './effects/queryDataEffect.js';
import { initStartEffect } from './effects/startEffect.js';
import { initRegEffect } from './effects/regEffect.js';
import { initLogEffect } from './effects/logEffect.js';
import dotenv from 'dotenv';

dotenv.config({path: `.${process.env.NODE_ENV}.env`})

const langConf = {
    langData: "",
    lang: "",
}

const token = process.env.TELEGRAM_TOKEN;

const url = process.env.TELEGRAM_BOT_URL || "https://mytestserver.bot.nu/";

const bot = new TelegramBot(token, {polling: true});

const startBot = (callback) => {

    bot.setMyCommands(initCommands());

    bot.onText(/\/start/, initStartEffect(bot))

    bot.onText(/\/info/, async msg => bot.sendMessage(msg.chat.id, langConf.langData.lang.commands.info))

    bot.onText(/\/reg/, initRegEffect(bot, langConf, url + 'register'))

    bot.onText(/\/log/, initLogEffect(bot, langConf, url))
    bot.on('callback_query',  initQueryDataEffect(bot, langConf))

    bot.onText(/\/user/, async msg => {
        console.log(msg.chat.id)
        console.log(msg.from.id)

    })

    callback(bot)
}

export {startBot, bot, langConf}