const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  try {
    const userMsg = req.body.message;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMsg }],
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send("❌ Error: " + error.message);
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
