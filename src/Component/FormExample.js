import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  const [sendAmount, setSendAmount] = useState(0);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setResult(
      `You submitted ${sendAmount} ${sendCurrency} and want to receive ${receiveCurrency}.`,
    );
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationSendCurrency">
          <Form.Label>Send: </Form.Label>
          <Form.Select
            required
            value={sendCurrency}
            onChange={(e) => setSendCurrency(e.target.value)}
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
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationAmount">
          <Form.Label>Amount: </Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            placeholder="0"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationReceiveCurrency">
          <Form.Label>Receive: </Form.Label>
          <Form.Select
            required
            value={receiveCurrency}
            onChange={(e) => setReceiveCurrency(e.target.value)}
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
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
  );
}

export default FormExample;
