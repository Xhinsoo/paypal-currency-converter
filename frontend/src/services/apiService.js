export const fetchPaypalQuote = async (FormData) => {
    const { base_currency, quote_currency, base_amount } = FormData;
      const response = await fetch("/api/paypal/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base_currency,
          quote_currency,
          base_amount: parseFloat(base_amount),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const serverError =
          data.error ||
          data.message ||
          JSON.stringify(data) ||
          "PayPal request failed";
        throw new Error(
          typeof serverError === "string"
            ? serverError
            : JSON.stringify(serverError),
        );
      }
      
      return data;
   
  };


