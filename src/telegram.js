const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
// telegram bot token
const token = process.env.TG_TOKEN

// polling to fetch new updates
const bot = new TelegramBot(token, { polling: true })

// listen for certain messages.
bot.on('message', (msg) => {
  // const myId = '799596102';
  const userId = msg.chat.id

  msg.text.includes('test')
    ? bot.sendMessage(userId, 'works')
    : bot.sendMessage(userId, 'some other text')
})

module.exports = function () {
  this.sendMessageToGroup = async function (groupId, message) {
    return await bot.sendMessage(groupId, message)
  }
}
