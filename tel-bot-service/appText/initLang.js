import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initBotLang(bot, chatId, data) {
    try {
       const langFile = fs.readFileSync(__dirname + `/${data}/lang.json`, 'utf8');

       const langData = JSON.parse(langFile)

       return langData;

    } catch (e) {
       console.error(e);
    }
}

export {initBotLang}
