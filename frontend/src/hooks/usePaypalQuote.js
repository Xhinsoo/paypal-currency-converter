import { useState } from "react";
import { fetchPaypalQuote } from "../services/apiService.js";

export const usePaypalQuote = () => {

    const [formData, setFormData ] = useState({
        base_currency: "USD",
        quote_currency: "EUR",
        base_amount: 0,
    });
    
    const [result, setResult] = useState("");
    const [validated, setValidated] = useState(false);
    const updateField = (field, value) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if(form.checkValidity() === false){
            event.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);
        setResult("Calculating...");
        try{
            const data = await fetchPaypalQuote({...formData, 
            base_amount: parseFloat(formData.base_amount).toFixed(1)});
        setResult(`You will receive  ${data.receive_amount} ${formData.quote_currency}`);
}catch(error){  
    setResult(`Error: ${error.message}`)}}
    return {
        formData,
        updateField, result, validated, handleSubmit}
    };