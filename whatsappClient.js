const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    handleSIGINT: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  }
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});



client.on('authenticated', (session) => {
  console.log('Client is authenticated!',session);
});

client.on('ready', (msg) => {
  console.log('Client is ready!',msg);
});

client.on('change_state', (msg) => {
  console.log('Client is change_state!',msg);
});


client.on('disconnected', (msg) => {
  console.log('Client is disconnected!',msg);
});

//test if script is working. User send !ping e script return pong
client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();

module.exports = client;