import React, { useState } from 'react';
import { Modal, Form, Button, Container, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ show, handleClose, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    const passValidation = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrorMessage(passwordRegex.test(value) ? '' : 'Invalid password.');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginRequest();
    };

    const loginRequest = () => {
        fetch('http://localhost:8086/api/customers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.setItem('email', email);
                    return response.json();
                }
                if (response.status === 401) {
                    throw new Error('Invalid credentials');
                }
                throw new Error('Something went wrong. Please try again later.');
            })
            .then((data) => {
                if (data) {
                    // Clear form fields
                    setEmail('');
                    setPassword('');
                    setErrorMessage('');
                    localStorage.setItem('token', data.token); // Store token in localStorage
                    setLoggedIn(true); // Update logged-in state

                    // Show success modal
                    setShowSuccessModal(true);
                }
            })
            .catch((error) => setErrorMessage(error.message || 'Something went wrong. Please try again later.'));
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false); // Close success modal
        handleClose(); // Close login modal
        navigate('/'); // Navigate to home page
    };

    const inputIconStyle = {
        background: 'transparent',
        color: '#ddd',
        border: '1px solid rgba(255, 255, 255, 0.3)',
    };

    const inputFieldStyle = {
        background: 'transparent',
        color: '#ddd',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: 'none',
        '::placeholder': {
            color: '#aaa',
        },
    };

    const loginBtnStyle = {
        backgroundColor: '#00aaff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: '0.3s',
    };

    const registerLinkStyle = {
        color: '#00aaff',
        fontSize: '0.9rem',
        cursor: 'pointer',
        textDecoration: 'underline',
    };

    const navigateRegister = () => {
        handleClose();
        navigate('/register');
    };

    return (
        <>
            {/* Login Modal */}
            <Modal show={show} onHide={handleClose} centered contentClassName="border-0" className="custom-modal">
                <Modal.Dialog className="modal-dialog-centered" style={{ maxWidth: '400px', width: '100%' }}>
                    <Modal.Body
                        style={{
                            borderRadius: '15px',
                            background: 'linear-gradient(to right, #141E30, #243B55)',
                            color: '#ddd',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            padding: '30px',
                            width: '100%',
                        }}
                    >
                        <Container className="text-center" style={{ width: '100%' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Welcome Back</h2>
                            <p style={{ color: '#ccc', fontSize: '1rem' }}>Login to continue your journey with us</p>

                            <Form onSubmit={handleSubmit} className="text-left">
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#fff', fontWeight: 'bold' }}>Email Address</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text style={inputIconStyle}><FaUser /></InputGroup.Text>
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
                                    <Form.Label style={{ color: '#fff', fontWeight: 'bold' }}>Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text style={inputIconStyle}><FaLock /></InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={passValidation}
                                            required
                                            style={inputFieldStyle}
                                        />
                                    </InputGroup>
                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                </Form.Group>

                                <Button type="submit" className="btn-block" style={loginBtnStyle}>
                                    Login
                                </Button>

                                <div className="mt-3">
                                    <p style={{ color: '#bbb' }}>
                                        Don't have an account?{' '}
                                        <span onClick={navigateRegister} style={registerLinkStyle}>
                                            Register here
                                        </span>
                                    </p>
                                </div>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose} centered>
                <Modal.Body
                    style={{
                        borderRadius: '15px',
                        background: 'linear-gradient(to right, #141E30, #243B55)',
                        color: '#ddd',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        padding: '30px',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Login Successful!</h2>
                    <p style={{ color: '#ccc', fontSize: '1rem' }}>You have successfully logged in.</p>
                    <Button
                        onClick={handleSuccessModalClose}
                        style={loginBtnStyle}
                    >
                        Continue
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginForm;