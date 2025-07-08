const fetch = require("node-fetch");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://www.unitedsupport508.com", // your live Webflow site
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const { prompt } = JSON.parse(event.body); // ⬅️ prompt sent from client
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1792"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
