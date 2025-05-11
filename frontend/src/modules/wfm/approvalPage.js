import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import './ApprovalPage.css';
import { useMemo } from 'react';

const reportTypes = {
  "Feeder MI Approval": {
    hierarchyLevels: ["Circle", "Division", "Sub Division"],
    officeMap: {
      Circle: ["Circle Office A", "Circle Office B"],
      Division: ["Division Office A", "Division Office B"],
      "Sub Division": ["Sub Division Office A", "Sub Division Office B"]
    },
    statuses: ["Pending", "Approved", "Rejected"]
  },
  "Transformer Approval": {
    hierarchyLevels: ["Zone", "District", "Feeder"],
    officeMap: {
      Zone: ["Zone Office X", "Zone Office Y"],
      District: ["District Office X", "District Office Y"],
      Feeder: ["Feeder Office X", "Feeder Office Y"]
    },
    statuses: ["New", "Reviewed"]
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  return isNaN(d) ? "" : d.toISOString().split("T")[0];
};

const ApprovalPage = () => {
  const today = useMemo(() => new Date(), []);
const yesterday = useMemo(() => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
}, []);

  const [selectedReport, setSelectedReport] = useState("Feeder MI Approval");
  const config = reportTypes[selectedReport];

  const [formData, setFormData] = useState({
    hierarchy: config.hierarchyLevels[0],
    office: config.officeMap[config.hierarchyLevels[0]][0],
    fromDate: formatDate(yesterday),
    toDate: formatDate(today),
    status: config.statuses[0]
  });

  const [officeOptions, setOfficeOptions] = useState(config.officeMap[config.hierarchyLevels[0]]);

  useEffect(() => {
  const hierarchy = config.hierarchyLevels[0];
  const firstOffice = config.officeMap[hierarchy][0];
  const defaultStatus = config.statuses[0];

  setFormData({
    hierarchy,
    office: firstOffice,
    fromDate: formatDate(yesterday),
    toDate: formatDate(today),
    status: defaultStatus
  });
  setOfficeOptions(config.officeMap[hierarchy]);
}, [selectedReport, config.hierarchyLevels, config.officeMap, config.statuses, today, yesterday]);

useEffect(() => {
  if (formData.hierarchy) {
    const newOffices = config.officeMap[formData.hierarchy] || [];
    setOfficeOptions(newOffices);
    setFormData((prev) => ({
      ...prev,
      office: newOffices[0] || ""
    }));
  }
}, [formData.hierarchy, config.officeMap]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="py-4 d-flex flex-column align-items-center">

      {/* Report Type Dropdown */}
      <Row className="justify-content-center mb-4 w-100">
        <Col xs={12} md={6}>
          <Form.Select
            size="sm"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            {Object.keys(reportTypes).map((report, idx) => (
              <option key={idx} value={report}>{report}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Form Row */}
      <Form className="w-100">
        <Row className="justify-content-center g-2 text-center">

          <Col xs={6} md={2}>
            <Form.Group>
              <Form.Label className="small">Hierarchy</Form.Label>
              <Form.Select
                size="sm"
                name="hierarchy"
                value={formData.hierarchy}
                onChange={handleChange}
              >
                {config.hierarchyLevels.map((level, idx) => (
                  <option key={idx}>{level}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={6} md={2}>
            <Form.Group>
              <Form.Label className="small">Office</Form.Label>
              <Form.Select
                size="sm"
                name="office"
                value={formData.office}
                onChange={handleChange}
              >
                {officeOptions.map((office, idx) => (
                  <option key={idx}>{office}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={6} md={2}>
            <Form.Group>
              <Form.Label className="small">From Date</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6} md={2}>
            <Form.Group>
              <Form.Label className="small">To Date</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={6} md={2}>
            <Form.Group>
              <Form.Label className="small">Status</Form.Label>
              <Form.Select
                size="sm"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {config.statuses.map((status, idx) => (
                  <option key={idx}>{status}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* View Button */}
        <Row className="justify-content-center mt-3">
          <Col xs="auto">
            <Button className="fw-bold px-4" size="sm" variant="primary">View</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ApprovalPage;
