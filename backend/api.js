import express from "express";
import fetch from "node-fetch";
import AppError from "./middleware/appError.js";
import {getQuote} from "./controllers/paypalController.js";
import {errorController} from "./middleware/errorController.js";
import { getPayPalAccessToken } from "./services/paypalService.js";
import {getExchangeQuote} from "./services/exchangeQuoteService.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());


//Routes
app.post("/api/paypal/quote", getQuote);
  
//Error handler
app.use(errorController);

  


app.listen(3001, () => {
  console.log("Backend server running on port 3001");
});
