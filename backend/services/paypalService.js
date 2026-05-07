import AppError from "../middleware/appError.js";

export const getPayPalAccessToken = async () => {
  const {PAYPAL_CLIENT_ID, PAYPAL_SECRET} = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    ).toString("base64");
    try{
      const tokenResponse = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: 
            "grant_type=client_credentials",
          });
          const data = await tokenResponse.json();
          return data;
      }catch(error){
        return new AppError("Failed to obtain PayPal access token", error.status || 401);
      }
  

    }
