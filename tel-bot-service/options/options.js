function setOptions ({inLine = [], key = []}) {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: inLine,
            keyboard: key,
            resize_keyboard: true,
            one_time_keyboard: true,
        })
    }
}

export {setOptions}