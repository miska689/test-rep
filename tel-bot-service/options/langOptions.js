import {setOptions} from './options.js';

function initLangOptions() {
    return setOptions( {
        inLine: [
            [
                {text: "ro", callback_data: "ro"},
                {text: "ru", callback_data: "ru"},
                {text: "en", callback_data: "en"},
            ]
        ]
    });
}

export {initLangOptions}