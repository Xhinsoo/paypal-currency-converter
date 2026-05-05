const fetch = require("node-fetch");
require("dotenv").config();

async function testPayPalCredentials() {
  console.log("🔍 Testing PayPal Credentials...\n");

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;

  console.log("Client ID:", clientId ? "✅ Loaded" : "❌ Not found");
  console.log("Client Secret:", clientSecret ? "✅ Loaded" : "❌ Not found");

  if (!clientId || !clientSecret) {
    console.log("\n❌ Missing credentials in .env file");
    return;
  }

  if (
    clientId.includes("YOUR_ACTUAL") ||
    clientSecret.includes("YOUR_ACTUAL")
  ) {
    console.log(
      "\n❌ Please replace placeholder credentials with real PayPal credentials",
    );
    return;
  }

  try {
    console.log("\n🔄 Requesting access token from PayPal...");

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (response.ok && data.access_token) {
      console.log("✅ SUCCESS: Credentials are valid!");
      console.log(
        "🔑 Access token received:",
        data.access_token.substring(0, 20) + "...",
      );
      console.log("⏰ Token expires in:", data.expires_in, "seconds");

      // Test the exchange rate API
      console.log("\n🔄 Testing exchange rate API...");
      const exchangeResponse = await fetch(
        "https://api-m.paypal.com/v2/pricing/quote-exchange-rates",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            base_currency: "USD",
            quote_currency: "EUR",
            amount: "100.00",
          }),
        },
      );

      if (exchangeResponse.ok) {
        const exchangeData = await exchangeResponse.json();
        console.log("✅ Exchange rate API working!");
        console.log(
          "💱 USD to EUR rate:",
          exchangeData.quote_amount?.value || "N/A",
        );
      } else {
        console.log("❌ Exchange rate API failed:", exchangeResponse.status);
      }
    } else {
      console.log("❌ FAILED: Invalid credentials");
      console.log(
        "Error:",
        data.error_description || data.error || "Unknown error",
      );
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }
}

testPayPalCredentials();
