const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false,
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
  console.log('Client is authenticated!', session);
  console.log('authenticated-client.info', client.info);
});

client.on('ready', (msg) => {
  console.log('Client is ready!', msg);
  console.log('ready-client.info', client.info);

});

client.on('change_state', (msg) => {
  console.log('Client is change_state!', msg);
});


client.on('disconnected', (msg) => {
  console.log('Client is disconnected!', msg);
});

//test if script is working. User send !ping e script return pong
client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();

module.exports = client;