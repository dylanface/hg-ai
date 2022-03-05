import { Configuration } from "openai";
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiInstance = new OpenAIApi(configuration);

export default openaiInstance;


