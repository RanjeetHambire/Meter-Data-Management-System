import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const RegisterUser = ({ currentUser }) => {
  const [form, setForm] = useState({
    adhaarNumber: '',
    name: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    role: 'CONTRACTOR'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const auth = {
        username: currentUser.username,
        password: currentUser.password
      };

      await axios.post('http://localhost:8080/users/register', form, { auth });
      setMessage('User registered successfully!');
      setError('');
    } catch (err) {
      setMessage('');
      setError('Failed to register user.');
    }
  };

  return (
    <Container style={{ maxWidth: 500 }}>
      <h3 className="mt-4">Register User</h3>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Aadhaar Number</Form.Label>
          <Form.Control name="adhaarNumber" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Mobile</Form.Label>
          <Form.Control name="mobile" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={form.role} onChange={handleChange}>
            <option value="CONTRACTOR">Contractor</option>
            <option value="SUPERVISOR">Supervisor</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">Register</Button>
      </Form>
    </Container>
  );
};

export default RegisterUser;
