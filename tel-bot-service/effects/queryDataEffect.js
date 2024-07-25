import {initBotLang} from '../appText/initLang.js';

function initQueryDataEffect(bot, langConf) {
    return async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'ro' || data === 'en' || data === 'ru') {
            langConf.langData = await initBotLang(bot, chatId, data);

            return bot.sendMessage(chatId, langConf.langData.lang.commands.info);
        }
    }
}

export {initQueryDataEffect}