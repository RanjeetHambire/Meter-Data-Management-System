import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';


const ExcelUploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select an Excel file to upload.");
      return;
    }

    // Simulate upload logic
    setMessage(`Uploaded: ${file.name}`);
    // You can integrate actual API upload here later
  };

  return (
    <Container className="py-5">
      <h4 className="text-center fw-bold mb-4">Excel Upload</h4>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6}>
          <Form.Group controlId="formFile">
            <Form.Label className="fw-bold">Choose Excel File (.xlsx or .csv)</Form.Label>
            <Form.Control type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="auto">
          <Button variant="primary" onClick={handleUpload} className="fw-bold px-4">
            Upload
          </Button>
        </Col>
      </Row>

      {message && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Alert variant="info" className="text-center">{message}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ExcelUploadPage;
