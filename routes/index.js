require('dotenv').config();
const OpenAI = require('openai');
const OPENAI_API_KEY = process.env.OPENAIAPIKEY;
const client = new OpenAI({apiKey: OPENAI_API_KEY});
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.json({ message: 'Express' });
});

router.get('/test', function(req, res) {
  res.json({ message: 'Test response!' })
});

router.get('/chat', async function(req, res) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: 'system',
        content: 'You are a great and experienced chef. Always provide the measurements in metric and respond using this JSON format: { \"recipeTitle\": string, \"howToPrepare\": string[], \"ingredients\": string, \"macrosPerPortion\": string, \"timeToPrepare\": string, \"kcalPerPortion\": string, \"portionsCount\": string}}.'
      },
      {
        role: 'user',
        content: 'Tell me a quick recipe with eggs and rice'
      }
    ]
  });

  res.json({message: JSON.parse(response.output_text)})
  // res.json({message: response});
});

module.exports = router;
