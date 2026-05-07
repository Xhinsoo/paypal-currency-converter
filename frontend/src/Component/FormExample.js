
import {Button, Col, Form, Row, Card} from "react-bootstrap";
import { usePaypalQuote } from "../hooks/usePaypalQuote.js";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];
function FormExample() {
  const {formData, updateField, result, validated, handleSubmit} = usePaypalQuote();


return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Paypal conversion rate</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Base Currency */}
            <Form.Group as={Col} md="4" controlId="valBase">
              <Form.Label>Send:</Form.Label>
              <Form.Select
                value={formData.base_currency}
                onChange={(e) => updateField("base_currency", e.target.value)}
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Amount */}
            <Form.Group as={Col} md="4" controlId="valAmount">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                value={formData.base_amount}
                onChange={(e) => updateField("base_amount", e.target.value)}
              />
            </Form.Group>

            {/* Quote Currency */}
            <Form.Group as={Col} md="4" controlId="valQuote">
              <Form.Label>Receive:</Form.Label>
              <Form.Select
                value={formData.quote_currency}
                onChange={(e) => updateField("quote_currency", e.target.value)}
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button type="submit">Submit form</Button>

          {result && (
            <div className="mt-4 p-3 border rounded bg-light text-center">
              <h6>{result}</h6>
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormExample;