import AppError from "../middleware/appError.js";
import { getPayPalAccessToken } from "../services/paypalService.js";
import { getExchangeQuote } from "../services/exchangeQuoteService.js";

export const getQuote = async (req, res, next) => {
    console.log(req.body);
    try{
        const { base_amount, base_currency, quote_currency } = req.body;
        if( !base_currency || !quote_currency){
          return next(new AppError("Missing required parameters: ", 400));
        }           
        
        //get token
        const accessToken = await getPayPalAccessToken();
        //get data
        const paypalResponse = await getExchangeQuote(accessToken.access_token, { base_amount, base_currency, quote_currency });
    
        if(!paypalResponse || !paypalResponse.exchange_rate_quotes){
            return next(new AppError("Failed to fetch quote from PayPal API", paypalResponse.status));
        }

        res.status(200).json({
            status: 'success',
            receive_amount: paypalResponse.exchange_rate_quotes[0].quote_amount.value,
            
        });
    }catch(error){
        return next(new AppError("An error occurred while processing your request", 500));
    }};
