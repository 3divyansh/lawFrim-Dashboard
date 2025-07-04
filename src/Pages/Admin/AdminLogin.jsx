import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import './AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {  // onLoginSuccess prop add kiya
  const [email, setEmail] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = 'admin@gmail.com';
    const validSecret = '123456';

    if (!email || !secretCode) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (email === validEmail && secretCode === validSecret) {
	 console.log('Login successful');
      setError('');
      onLoginSuccess(); 
      navigate('/');
    } else {
      setError('Invalid email or secret code.');
    }
  };

  return (
    <div className="admin-login d-flex align-items-center justify-content-center vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow p-4 rounded-4">
              <h2 className="text-center mb-4 fw-bold">Admin Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label><FaEnvelope className="me-2" /> Email address</Form.Label>
                  <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formSecret">
                  <Form.Label><FaLock className="me-2" /> Secret Code</Form.Label>
                  <Form.Control 
                    type="password"
                    placeholder="Enter secret code"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 rounded-pill">
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;