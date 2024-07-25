const TelegramApi = require ('node-telegram-bot-api');
const {gameOption, againOption} = require ('./options');
const token = '7460964264:AAEBYYKuwu7d1jXpKfPou9OQ1xTVEvrlHlw';
const bot = new TelegramApi (token, {polling: true});
const chats = {};


const startGame = async (chatId) => { // генерация рандомной цияры для игры
    await bot.sendMessage (chatId, 'я загадаю число от 0 до 9, а ты отгадай какое');
    const randomNumber = Math. floor(Math.random() * 10);
    chats [chatId]= randomNumber;
    await bot.sendMessage (chatId, 'Отгадывай число, я загадал', gameOption)
}
const start=() => { 

    //описание команд в меню
    bot.setMyCommands ([ 
        {command:'/start', description: 'Начальное сообщение'},
        {command:'/info', description: 'информация о пользователе'},
        {command:'/game', description: 'игра угадай число'},
    ]) 

    // прием сообщение и реакция на них
    bot.on('message', async msg => { 
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendMessage (chatId, "Добро пожаловать! Ура! получается!")
            return bot.sendSticker (chatId, 'https://data.chpic.su/stickers/d/DemonSlayer229/DemonSlayer229_001.webp')
        };

        if (text === '/info') {
        bot.sendMessage (chatId, `твое имя ${msg.from.first_name} ${msg.chat.last_name}`)
    };

    if (text === '/game') {
       return startGame (chatId);
    } else {
        return bot.sendMessage (chatId, `ты написал мне ${text}`)
    }
            
        });
        

    bot.on ('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again'){
            return startGame (chatId);
        }

        if (+data === chats[chatId]){
            return bot.sendMessage (chatId, 'Верно! ты отгадал!', againOption)
        } else {
            bot.sendMessage (chatId, `не то. я загадал ${chats[chatId]}`, againOption)
        }
    })
}

start();

