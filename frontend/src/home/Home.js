import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import './Home.css';

const modules = [
  { name: 'MIS', description: 'Decision Support System and enabling the user to identify the behaviours.', link: '/mis' },
  { name: 'PREPAID', description: 'Prepaid interface to handle in Smart Meters through centrally monitored and managed credit system.', link: '/prepaid' },
  { name: 'WFM', description: 'Meter Stock-Flow and change management for Meter and AMI installation support.', link: '/wfm' }
];

const Home = () => {
  return (
    <>
      {/* Header */}
      <Navbar bg="light" data-bs-theme="light" expand="lg" className="px-4 nav-style">
        <Navbar.Brand href="/">MahaVitaran Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Cards */}
      <Container fluid className="home-page py-5">
        <h2 className="text-center mb-4">Meter Data Management System (MDMS)</h2>
        <p>A comprehensive platform that provides a visual representation of key metrics, trends, and insights derived from meter data. Offering utilities and system <br></br> operators in depth analytics of their metering infrastructure and energy consumption patterns.</p>
        <Row className="g-4 justify-content-center">
          {modules.map((mod, idx) => (
            <Col xs={12} sm={6} md={4} lg={3} key={idx}>
              <Card className="module-card h-100">
                <Card.Body>
                  <Card.Title>{mod.name}</Card.Title>
                  <Card.Text>{mod.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <a href={mod.link} className="btn btn-outline-primary w-100">Go to {mod.name}</a>
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
