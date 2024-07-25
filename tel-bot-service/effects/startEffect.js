import {initLangOptions} from '../options/langOptions.js';

function initStartEffect(bot) {
    const startText =
        "🇷🇴 Te rugăm să alegi limba dorită pentru a continua.\n\n" +
        "🇬🇧 Please choose your preferred language to continue.\n\n" +
        "🇷🇺 Пожалуйста, выберите предпочитаемый язык, чтобы продолжить.";
    return async msg => {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, startText, initLangOptions());
    }
}

export {initStartEffect}