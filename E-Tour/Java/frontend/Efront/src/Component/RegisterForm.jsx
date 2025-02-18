import React, { useState } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(passwordRegex.test(value) ? '' : 'Invalid password format.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }
        if (passwordError) return;

        const customer = { firstName, lastName, email, password };

        try {
            const response = await fetch('http://localhost:8086/api/customers/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });

            if (!response.ok) throw new Error('Failed to register customer');

            alert('🎉 Account created successfully!');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('');
            setPasswordError('');
            navigate('/dashboard'); // Navigate to login after successful registration
        } catch (error) {
            console.error('❌ Error:', error.message);
        }
    };

    const inputIconStyle = {
        background: 'transparent',
        color: '#ddd',
        border: '1px solid rgba(255, 255, 255, 0.3)',
    };

    const inputFieldStyle = {
        background: 'transparent',
        color: '#fff', // Set the text color to white
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: 'none',
    };

    const registerBtnStyle = {
        backgroundColor: '#00aaff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: '0.3s',
    };

    return (
        <Container
            style={{
                maxWidth: '600px',
                marginTop: '100px',
                padding: '30px',
                background: 'linear-gradient(to right, #141E30, #243B55)',
                borderRadius: '15px',
                color: '#ddd',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <h2 className="text-center text-white">Create an Account</h2>
            <p className="text-center text-white">Join us and start your journey</p>

            <Form onSubmit={handleSubmit} className="text-left">
                <Row className="mb-3">
                    <Col sm={6}>
                        <Form.Label className="text-white" style={{ fontWeight: 'bold' }}>First Name</Form.Label>
                        <InputGroup>
                            <InputGroup.Text style={inputIconStyle}><FaUser /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                style={inputFieldStyle}
                            />
                        </InputGroup>
                    </Col>

                    <Col sm={6}>
                        <Form.Label className="text-white" style={{ fontWeight: 'bold' }}>Last Name</Form.Label>
                        <InputGroup>
                            <InputGroup.Text style={inputIconStyle}><FaUser /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                style={inputFieldStyle}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label className="text-white" style={{ fontWeight: 'bold' }}>Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Text style={inputIconStyle}><FaEnvelope /></InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputFieldStyle}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="text-white" style={{ fontWeight: 'bold' }}>Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text style={inputIconStyle}><FaLock /></InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            required
                            style={inputFieldStyle}
                        />
                    </InputGroup>
                    {passwordError && <span className="text-danger">{passwordError}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="text-white" style={{ fontWeight: 'bold' }}>Confirm Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text style={inputIconStyle}><FaLock /></InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorMessage(password !== e.target.value ? 'Passwords do not match!' : '');
                            }}
                            required
                            style={inputFieldStyle}
                        />
                    </InputGroup>
                    {errorMessage && <span className="text-danger">{errorMessage}</span>}
                </Form.Group>

                <Button type="submit" className="w-100" style={registerBtnStyle}>
                    Register
                </Button>
            </Form>

            <div className="text-center mt-3">
    <span
        style={{ color: '#00aaff', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => navigate('/login')} // This will navigate to the login page
    >
        Already have an account? <strong>Login</strong>
    </span>
</div>

        </Container>
    );
};

// Apply Global Styles for Placeholder Text Color
const GlobalStyle = styled.div`
    input::placeholder {
        color: #fff !important;
    }
`;

export default () => (
    <GlobalStyle>
        <RegisterPage />
    </GlobalStyle>
);








