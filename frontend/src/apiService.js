export const sendQuote = async (FormData) => {
    const response = await fetch("/api/paypal/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData)
    });
    return response.json();
};