// server.js
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./whatsappClient'); // 导入whatsappClient模块

const app = express();
app.use(bodyParser.json());

// 给某人发消息
app.post('/send-message', async (req, res) => {
	const { contactNumber, messageText } = req.body;
	console.log("contactNumber", contactNumber);
	try {
		const send_number = async (number, text) => {
			try {
				const isRegistered = await client.isRegisteredUser(number);
				console.log('number', number);

				if (isRegistered) {
					console.log(number + ' Registered');
					await client.sendMessage(number, (text + " "));
				} else {
					console.log(number + ' no Registered');
				}
			} catch (err) {
				throw new Error(`注册检查报错：${err}`);
			}
		}

		await send_number(contactNumber, messageText);

		res.status(200).json({ success: true, message: 'Message sent successfully' });
	} catch (error) {
		console.error('Error sending message:', error);
		res.status(500).json({ success: false, message: 'Failed to send message' });
	}
});

// 获取与某人的聊天记录
app.post('/get-messages', async (req, res) => {
	const { contactNumber } = req.body;
	console.log("contactNumber", contactNumber);
	try {
		const getMessages = async (number) => {
			try {
				const isRegistered = await client.isRegisteredUser(number);
				console.log('number', number);

				if (isRegistered) {
					console.log(number + ' Registered');
					const contact = await client.getChatById(number);
					const messages = await contact.fetchMessages({ limit: 100 })
					const messageData = messages.map((message) => ({
						id: message.id.id,
						content: message.body,
						timestamp: message.timestamp,
						FromMe:message.id.fromMe
					}));
					console.log("messageData", messageData);
				} else {
					console.log(number + ' no Registered');
				}
			} catch (err) {
				throw new Error(`注册检查报错：${err}`);
			}
		}

		await getMessages(contactNumber + "@c.us");

		res.status(200).json({ success: true, message: 'Message get successfully' });
	} catch (error) {
		console.error('Error getting message:', error);
		res.status(500).json({ success: false, message: 'Failed to get message' });
	}
});




const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
