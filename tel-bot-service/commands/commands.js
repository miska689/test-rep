function initCommands(commands = []) {
    return [
        {
            command: '/start',
            description: 'Start the bot',
        },
        {
            command: '/reg',
            description: 'Register user (you need admin key)',
        },
        {
            command: '/log',
            description: 'Log in user',
        },
        {
            command: '/info',
            description: 'Info app',
        },
        ...commands
    ]
}


export {
    initCommands
}