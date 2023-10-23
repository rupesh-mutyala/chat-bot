const express = require('express');
const bodyParser = require('body-parser');
const texts = require('./texts');

const app = express();
const cors = require('cors');

app.use(bodyParser.json()); // parsing

app.use(cors());

// Store conversations data in memory
let conversations = [];

app.get('/api/conversations', (req, res) => {
	const { message_id = '', id = '' } = req?.query || {};

	const messageId = parseInt(message_id, 10);
	const con_id = parseInt(id, 10);

	let finalResponse = conversations;

	if (message_id) {
		finalResponse = finalResponse.map((item) => {
			if (item.id === con_id) {
				return {
					...item,
					messages: item.messages.map((item1) => {
						if (item1.message_id === messageId) {
							return { ...item1, is_new: true };
						}

						return item1;
					}),
				};
			}

			return item;
		});
	}

	res.json(finalResponse);
});

app.post('/api/save_conversation', (req, res) => {
	const conversation = req.body;

	const { id } = conversation;

	conversations = conversations.map((item) => {
		if (item.id === id) {
			return conversation;
		}

		return item;
	});

	res.status(200).json({ message: 'Conversation saved successfully' });
});

app.post('/api/create_conversation', (req, res) => {
	const { id: conversation_id } = req.body;
	conversations.push({ id: conversation_id, messages: [], is_saved: false });
	res.status(200).json({ message: 'Conversation created successfully' });
});

app.get('/api/conversation/:id', (req, res) => {
	const conversationId = parseInt(req.params.id, 10); // Parse the ID as an integer

	const conversation = conversations.find((conv) => conv.id === conversationId);

	if (!conversation) {
		// error handling if not found
		return res.status(404).json({ error: 'Conversation not found' });
	}

	// Return the conversation with the ID
	res.json(conversation);
});

app.post('/api/send_question', (req, res) => {
	// Generate a random number between 0 and 1
	const random = Math.random();

	const conversationId = parseInt(req.body.id, 10);

	const { message_id, question = '' } = req.body;

	const text = texts[Math.floor(Math.random() * texts.length)] || texts[0];

	conversations = conversations.map((item) => {
		if (item.id === conversationId) {
			return {
				...item,
				messages: [
					...item.messages,
					{
						message_id,
						user: question,
						reaction: null,
						bot: random > 0.6 ? text : null,
					},
				],
			};
		}

		return item;
	});

	if (random < 0.6) {
		// 60% chance of throwing error
		res.status(500).json({ error: 'Error: Failed to provide a response' });
	} else {
		// Provide a successful response
		res.json({
			message: text,
			message_id,
		});
	}
});

app.post('/api/regenerate_reponse', (req, res) => {

	const { id = '', message_id = '' } = req.body;

	const conversationId = parseInt(id, 10);
	const messageId = parseInt(message_id, 10);

	const text = texts[Math.floor(Math.random() * texts.length)] || texts[0];

	conversations = conversations.map((item) => {
		if (item.id === conversationId) {
			return {
				...item,
				messages: item.messages.map((item1) => {
					if (item1.message_id === messageId) {
						return { ...item1, bot:text };
					}

					return item1;
				}),
			};
		}

		return item;
	});

	res.status(200).json({ message: 'Conversation updated successfully' });
})

app.post('/api/delete_conversation', (req, res) => {
	const conversationId = parseInt(req.body.id, 10);

	conversations = conversations.filter((item) => item.id !== conversationId);

	res.status(200).json({ message: 'Conversation deleted successfully' });
});

app.post('/api/create_message_reaction', (req, res) => {
	const { id = '', reaction = '', message_id = '' } = req.body;

	const conversationId = parseInt(id, 10);
	const messageId = parseInt(message_id, 10);

	conversations = conversations.map((item) => {
		if (item.id === conversationId) {
			return {
				...item,
				messages: item.messages.map((item1) => {
					if (item1.message_id === messageId) {
						return { ...item1, reaction };
					}

					return item1;
				}),
			};
		}

		return item;
	});

	res.status(200).json({ message: 'reaction added successfully' });
});

app.post('/api/save_conversation_feedback', (req, res) => {
	const { id = '', feedback = '', rating=0 } = req.body;

	const conversationId = parseInt(id, 10);

	conversations = conversations.map((item) => {
		if (item.id === conversationId) {
			return {
				...item,
				feedback,
				rating
			};
		}

		return item;
	});

	res.status(200).json({ message: 'feedback saved successfully' });
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
