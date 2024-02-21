//Documentacao https://docs.wwebjs.dev/ 
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

//Read QRcode only one time
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

client.on('ready', () => {
  console.log('Client is ready!');


  // const number = "8618217751021";
  // const text = "Hi!";

  // const newNumber = number + "@c.us"
  // function send_number(number, text) {
  //   client.isRegisteredUser(number).then(function (isRegistered) {
  //     if (isRegistered) {
  //       console.log(number + ' Registered');
  //       client.sendMessage(number, (text + " " + number));
  //     } else {
  //       console.log(number + ' no Registered');
  //     }
  //   })
  // }
  // send_number(newNumber,text)
});


//teste if script is working. User send !ping e script return pong
client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();
//Closing correcily using CTRL+C 
// process.on('SIGINT', async () => {
//   console.log('(SIGINT) Shutting down...');
//   await client.destroy();
//   console.log('client destroyed');
//   process.exit(0);
// });

module.exports = client;