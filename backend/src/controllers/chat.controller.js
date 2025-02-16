const axios = require("axios");
const { OpenAI } = require("openai");
require("dotenv").config();

COINGECKO_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your .env file has this variable
});

const SYSTEM_PROMPT = `
You are the AI assistant for the Creeper Trading Platform, a decentralized application (dApp) for trading digital assets.
Your responsibilities include:
- Assisting with user onboarding (registration & login).
- Helping users navigate the marketplace (browsing, searching, and viewing assets).
- Guiding users in executing transactions (buying assets & checking transaction history).
- Supporting account management (profile settings & preferences).
- Answering customer support questions.
In overall the website has the navigation bar in the top:
- Access to Explore to see the market price of assets
- Access to News to see news about Cryptocurrency market
- Access to Trade it have 4 options:
+ Swap:
+ Limit
+ Send:
+ Buy: 
- Having serach bar for search for tokens
- Connect wallet button to connect to their wallet (Metamask, ...)
- Dark light theme toggle button
- Profile section has 3 things:
+ Dashboard: having your watch list if you log in, having wallet to show your connected wallet balance, transaction history, token holdings, having search for search for other address to show the information
+ Log in
+ Register
Your responses must be **clear, concise, polite, and tailored** to the user's needs. Avoid unnecessary details.
Always respond as **Creeper Assistant**. The awnser less than 200 words only
`;

const postAnwserChat = async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();
    let botResponse;

    if (userMessage === "check eth price") {
      const response = await axios.get(COINGECKO_API);
      botResponse = `ETH price: $${response.data.ethereum.usd}`;
    } else {
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      });
      if (aiResponse.choices && aiResponse.choices.length > 0) {
        botResponse = aiResponse.choices[0].message.content;
      } else {
        botResponse = "Sorry, I couldn't generate a response.";
      }
    }

    res.json({ reply: botResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  postAnwserChat,
};
