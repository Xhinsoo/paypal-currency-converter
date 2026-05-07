export const getExchangeQuote =  async(accessToken, data) =>{
      // console.log("1. Entering getExchangeQuote");
      const { base_currency, base_amount, quote_currency } = data;
      // console.log("debug : Acess token received in getExchangeQuote:", accessToken);
      try{
        const response = await fetch(
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
                  base_amount: parseFloat(base_amount).toFixed(2), //paypal api requires string with 1 decimal place
                  quote_currency: quote_currency,
                  
                },
              ],
            }),
          })

          // console.log("2. Response Status:", response.status);
               if (!response.ok) {
                 const errorDetails = await response.json();
              //console.log("3. Rejection Log:", errorDetails);
              throw new Error("PayPal Rejected");
             }
         
             return await response.json();
             }catch(error){
                 // console.error("4. fetch Error in getExchangeQuote:", error.message);
                 throw err;
      }
    };
      
