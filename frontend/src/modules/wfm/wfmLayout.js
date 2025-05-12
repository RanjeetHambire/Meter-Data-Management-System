import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';
import { Outlet, Link } from 'react-router-dom'; // <-- import Link
import './wfmLayout.css';

const WfmLayout = ({ currentUser, onLogout }) => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="border-bottom shadow-sm" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/wfm" className="fw-bold">MDMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="wfm-navbar" />
          <Navbar.Collapse id="wfm-navbar">
            <Nav className="me-auto">

              {/* Dashboard */}
              <Nav.Link as={Link} to="/wfm/dashboard" className="fw-bold">
                <Gear className="me-2 text-dark" />Dashboard
              </Nav.Link>

              {/* Report */}
              <NavDropdown
                title={<span className="fw-bold"><Gear className="me-2 text-dark" />Report</span>}
                id="report-dropdown"
                className="fw-bold custom-dropdown"
              >
                <NavDropdown.Item as={Link} to="/wfm/report/item1" className="fw-bold">
                  MR Report
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/wfm/report/item2" className="fw-bold">
                  Analysis Report
                </NavDropdown.Item>
              </NavDropdown>

              {/* Action */}
              <NavDropdown
                title={<span className="fw-bold"><Gear className="me-2 text-dark" />Action</span>}
                id="action-dropdown"
                className="fw-bold custom-dropdown"
              >
                <NavDropdown.Item as={Link} to="/wfm/action/approve" className="fw-bold">
                  Approve
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/wfm/action/reject" className="fw-bold">
                  Allocation
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/wfm/action/meter_allocation" className="fw-bold">
                  Meter Allocation
                </NavDropdown.Item>
              </NavDropdown>

              {/* Import */}
              <NavDropdown
                title={<span className="fw-bold"><Gear className="me-2 text-dark" />Import</span>}
                id="import-dropdown"
                className="fw-bold custom-dropdown"
              >
                <NavDropdown.Item as={Link} to="/wfm/import/excel_upload" className="fw-bold">
                   Excel Upload
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/wfm/import/excel_approval" className="fw-bold">
                  Excel Approval
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/wfm/import/sender_receiver" className="fw-bold">
                  Sender To Receiver
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          {/* Right Side: Greeting & Logout */}
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center">
              <span className="me-3 fw-semibold text-dark">Hello, {currentUser?.username}</span>
              <Button variant="outline-danger" size="sm" onClick={onLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Render nested WFM pages here */}
      <Container fluid className="mt-4 px-4">
        <Outlet />
      </Container>
    </>
  );
};

export default WfmLayout;
