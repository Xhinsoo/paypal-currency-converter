import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { sendQuote } from "../apiService"; 

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [base_currency, setBase_currency] = useState("USD");
  const [quote_currency, setQuote_currency] = useState("EUR");
  const [base_amount, setBase_amount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);



    try {
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
      

      setResult(`You will receive ${data.receiveAmount} ${quote_currency}`);
    } catch (error) {
      setResult(`Error: ${error.message || String(error)}`);
    }
  };








  return (
     <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Paypal conversion rate</Card.Title>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationBaseCurrency">
          <Form.Label>Send: </Form.Label>
          <Form.Select
            required
            value={base_currency}
            onChange={(e) => setBase_currency(e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="CNY">CNY - Chinese Yuan</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationAmount">
          <Form.Label>Amount: </Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            placeholder="0"
            value={base_amount}
            onChange={(e) => setBase_amount(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationQuoteCurrency">
          <Form.Label>Receive: </Form.Label>
          <Form.Select
            required
            value={quote_currency}
            onChange={(e) => setQuote_currency(e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="CNY">CNY - Chinese Yuan</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button type="submit">Submit form</Button>

      {result && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h5>Result</h5>
          <p>{result}</p>
        </div>
      )}
      </Form>
    </Card.Body>
    </Card>
  );
}

export default FormExample;
