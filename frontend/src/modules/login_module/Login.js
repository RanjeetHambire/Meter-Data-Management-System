import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

import { Row, Col, Image } from'react-bootstrap';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/users/me', {
        auth: {
          username: form.username,
          password: form.password
        }
      });

      console.log("Login successful:", response.data);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="vh-100">
        {/* Left Side */}
        <Col md={7} className="left-pane d-flex flex-column justify-content-center align-items-start px-5 text-white">
          <h1 className="mb-4">Welcome to,
          Adani MSEDCL - Meter Data Management System (MDMS)</h1>
          <p style={{ fontSize: '1.2rem' }}>
            Manage contractors, supervisors, and admin accounts securely and efficiently.
          </p>
          <Image
            src="/maha-image.png" // replace with your actual image path
            alt="MahaVitaran Illustration"
            fluid
            className="mt-4"
            style={{ maxWidth: '80%' }}
          />
        </Col>

        {/* Right Side - Login */}
        <Col md={5} className="right-pane d-flex flex-column justify-content-center align-items-center px-4">
          <Image src="/mahavitran_logo.png" alt="MahaVitaran Logo" style={{ width: '240px' }} className="mb-4" />
          <h3>Login</h3>
          {error && <Alert variant="danger" className="w-100">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '350px' }}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
