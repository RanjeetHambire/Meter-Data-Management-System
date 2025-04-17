import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import './Home.css';

const modules = [
  { name: 'MIS', description: 'Decision Support System and enabling the user to identify the behaviours.', link: '/mis' },
  { name: 'PREPAID', description: 'Prepaid interface to handle in Smart Meters through centrally monitored and managed credit system.', link: '/prepaid' },
  { name: 'WFM', description: 'Meter Stock-Flow and change management for Meter and AMI installation support.', link: '/wfm' }
];

const Home = ({ currentUser, onLogout }) => {
  return (
    <>
      {/* Header */}
      <Navbar data-bs-theme="light" expand="lg" className="px-4 nav-style border-bottom shadow-sm" sticky="top" style={{ backgroundColor: 'white', height: '70px' }}>
        <Navbar.Brand href="/" className="fw-bold">MahaVitaran Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <span className="me-3 fw-semibold text-dark">Hello, {currentUser?.username}</span>
            <Button variant="outline-danger" size="sm" onClick={onLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Cards */}
      <Container fluid className="home-page py-3">
  <h3 className="text-center mt-1 fw-bold text-dark fs-4">
    Meter Data Management System (MDMS)
  </h3>
  <p className="text-center text-dark extra-small">
    A comprehensive platform that provides a visual representation of key metrics, trends, and insights derived from meter data.
    Offering utilities and system <br></br> operators in-depth analytics of their metering infrastructure and energy consumption patterns.
  </p>

  <Row className="g-4 justify-content-center">
    {modules.map((mod, idx) => (
      <Col xs={12} sm={6} md={4} lg={3} key={idx}>
        <Card className="h-100 d-flex flex-column justify-content-between shadow-sm module-card">
          <Card.Body className="bg-white d-flex flex-column">
            <Card.Title className="fs-5 fw-bold">{mod.name}</Card.Title>
            <hr />
            <Card.Text className="fw-normal fs-7 text-muted flex-grow-1 extra-sm">
              {mod.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="bg-white border-0 text-center pb-4">
            <a href={mod.link} className="btn btn-outline-primary w-75">
              Go to {mod.name}
            </a>
          </Card.Footer>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

      {/* Footer */}
      <footer className="footer bg-light text-center py-3">
        <small>© 2025 MahaVitaran. All rights reserved.</small>
      </footer>
    </>
  );
};

export default Home;
