// import TelegramBot from 'node-telegram-bot-api';
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
// telegram bot token
const token = process.env.TG_TOKEN;

// polling to fetch new updates
const bot = new TelegramBot(token, { polling: true });

type Message = {
  chat: {
    chat: string;
    id: string;
  };
  text: string;
};

// listen for certain messages.
bot.on('message', (msg: Message) => {
  // const myId = '799596102';
  const userId = msg.chat.id;

  if (msg.text.includes('test')) {
    bot.sendMessage(userId, 'works');
  } else {
    bot.sendMessage(userId, 'some other text');
  }
});

const sendMessageToGroup = async (groupId: string, message: string) => {
  return await bot.sendMessage(groupId, message);
};

// module.exports = function () {
//   this.sendMessageToGroup = async function (groupId: string, message: string) {
//     return await bot.sendMessage(groupId, message);
//   };
// };

module.exports = {
  sendMessageToGroup,
};
