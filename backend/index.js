const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());  // parsing

// Store conversations data in memory
const conversations = [];

// Endpoint to save a conversation
app.post('/api/conversations', (req, res) => {
  const conversation = req.body;
  conversations.push(conversation);
  res.status(201).json({ message: 'Conversation saved successfully' });
});

// Endpoint to retrieve all conversations
app.get('/api/conversations', (req, res) => {
  res.json(conversations);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
