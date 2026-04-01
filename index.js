if (typeof process !== 'undefined' && !process.browser && process.platform !== 'browser' && parseInt(process.versions.node.split('.')[0]) < 18) {
  console.error('Your node version is currently', process.versions.node)
  console.error('Please update it to a version >= 22.x.x from https://nodejs.org/')
  process.exit(1)
}

module.exports = require('./lib/loader.js')
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'AuraSMPbyADMINAURA.aternos.me', // Change this to your Aternos IP
  username: 'AuraSentinel_Bot',      // The name of your 24/7 bot
  version: '26.1'                  // Matches your Spigot 26.1
})

// Movement & Jumping to prevent AFK kicks
bot.on('spawn', () => {
  console.log('TheAdminAura Bot is online and moving!')
  
  setInterval(() => {
    // Jump every 30 seconds
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
    
    // Swing arm to look "active"
    bot.swingArm()
    
    // Randomly move forward for a split second
    bot.setControlState('forward', true)
    setTimeout(() => bot.setControlState('forward', false), 200)
  }, 30000) 
})

// Auto-reconnect if the server restarts
bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting in 30 seconds...')
  setTimeout(() => process.exit(), 30000) 
})
