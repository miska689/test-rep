function initRegEffect(bot, langConf, url) {
    return async msg => {
        const chatId = msg.chat.id;
        try{
            return bot.sendMessage(chatId, langConf.langData.lang.commands.reg, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: langConf.langData.lang.buttons.reg_button, web_app: {url}}]
                    ]
                },
                parse_mode: 'HTML'
            });
        } catch(e) {
            console.log(e);
            return bot.sendMessage(chatId, "Alegeti limba varog!")
        }
    }
}

export {initRegEffect};