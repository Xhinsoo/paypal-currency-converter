const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

 app.get("/api/test", (req, res) => {
      console.log("hello")
      res.json("test");
    
    });


//get token 
app.post("/api/paypal/quote", async (req, res) => {
  try {
    const { base_currency, quote_currency, base_amount } = req.body;
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString("base64");
    const tokenResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      },
    );
    
    const tokenData = await tokenResponse.json();
  

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({
        error:
          tokenData.error_description ||
          tokenData.error ||
          tokenData.message ||
          "Failed to get PayPal access token",
      });
    }

    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return res.status(500).json({
        error:
          "PayPal access token was not returned. Check your sandbox credentials.",
      });
    }

    //get quote from paypal sandbox
    const paypalResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v2/pricing/quote-exchange-rates",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote_items: [
            {
              type: "EXCHANGE_RATE",
              base_currency: base_currency,
              base_amount: parseFloat(base_amount).toFixed(1),
              quote_currency: quote_currency,
              
            },
          ],
        }),
      },
    );
    const paypalData = await paypalResponse.json();

    if (!paypalResponse.ok) {
      // const errorMessage =
      //   paypalData.error?.message ||
      //   paypalData.error_description ||
      //   paypalData.message ||
      //   JSON.stringify(paypalData.error || paypalData);
      // return res.status(paypalResponse.status).json({ error: errorMessage });
      console.log("Error details:", paypalData.details); 
    }

    console.log("PayPal sandbox quote response:", JSON.stringify(paypalData));

    const receiveAmount = paypalData.exchange_rate_quotes[0].quote_amount.value;
    // console.log("test value" , paypalData.exchange_rate_quotes[0].quote_amount.value);
    if (!receiveAmount) {
      return res.status(500).json({
        error: "PayPal sandbox response did not contain quote_amount.value.",
        paypalData,
      });
    }

    res.json({
      base_amount,
      base_currency,
      quote_currency,
      receiveAmount: receiveAmount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Backend server running on port 3001");
});
