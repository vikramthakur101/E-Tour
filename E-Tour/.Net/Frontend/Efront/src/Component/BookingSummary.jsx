import React, { useEffect, useState } from "react";
import { Container, Card, Table, Row, Col, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUser, FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";
import "./bookingsummary.css"; // Ensure you have this CSS file

const BookingSummary = () => {
    const [passengers, setPassengers] = useState([]);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        durationDays,
        durationNights,
        selectedStartDate,
        selectedEndDate,
        tourName,
        profiledata,
        totalBaseAmount,
        totalTaxAmount,
        totalPrice,
        passengerCount,
        tourId,
        customerId,
        customername,
        bookingDate,
        imageUrl
    } = location.state || {};

    const email = localStorage.getItem('email');

    useEffect(() => {
        const storedPassengers = JSON.parse(localStorage.getItem("passengers")) || [];
        setPassengers(storedPassengers);
    }, []);

    const confirmBooking = () => {
        navigate('/payment', {
            state: {
                tourId,
                totalBaseAmount,
                totalPrice,
                totalTaxAmount,
                passengerCount,
                customername,
                customerId,
                tourName,
                email,
                bookingDate
            }
        });
    };

    return (
        <div className="booking-summary-page">
            {/* Hero Section */}
            <div className="header" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="overlay"></div>
                <h1 className="tour-name">{tourName}</h1>
                <p className="tour-duration">
                    <FaCalendarAlt /> {durationDays} Days & {durationNights} Nights
                </p>
            </div>

            {/* Booking Summary Section */}
            <Container className="booking-summary-container mt-4 p-4 border rounded bg-light">
                <h2 className="text-center mb-4">Booking Summary</h2>

                {/* Tour Details */}
                <Card className="mb-4 p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title className="text-primary">
                            <FaCheckCircle className="me-2" />
                            Tour Details
                        </Card.Title>
                        <Row>
                            <Col md={6}>
                                <p><strong>Start Date:</strong> {selectedStartDate}</p>
                                <p><strong>End Date:</strong> {selectedEndDate}</p>
                            </Col>
                            <Col md={6}>
                                <p><strong>Duration:</strong> {durationDays} & {durationNights} </p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Profile Details */}
                <Card className="mb-4 p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>
                            <FaUser className="me-2" />
                            Profile Details
                        </Card.Title>
                        <Row>
                            <Col md={6}>
                                <p><strong>Name:</strong> {profiledata.firstName} {profiledata.lastName}</p>
                            </Col>
                            <Col md={6}>
                                <p><strong>Email:</strong> {email}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Passenger Details Table */}
                <Card className="mb-4 p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>Passengers</Card.Title>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Passenger Type</th>
                                    <th>Price (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passengers.length > 0 ? (
                                    passengers.map((passenger, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{passenger.firstName} {passenger.lastName}</td>
                                            <td>{passenger.dob}</td>
                                            <td>{passenger.mobile}</td>
                                            <td>{passenger.email}</td>
                                            <td>{passenger.passengerType}</td>
                                            <td>₹{passenger.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No passengers added.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Price Summary */}
                <Card className="p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>
                            <FaMoneyBillAlt className="me-2" />
                            Price Summary
                        </Card.Title>
                        <Row className="text-center">
                            <Col md={3}>
                                <p className="mb-1"><strong>Base Price</strong></p>
                                <p>₹{totalBaseAmount}</p>
                            </Col>
                            <Col md={3}>
                                <p className="mb-1"><strong>Tax Price</strong></p>
                                <p>₹{totalTaxAmount}</p>
                            </Col>
                            <Col md={3}>
                                <p className="mb-1"><strong>Total Price</strong></p>
                                <p>₹{totalPrice.toFixed(2)}</p>
                            </Col>
                            <Col md={3}>
                                <p className="mb-1"><strong>Passengers</strong></p>
                                <p>{passengerCount}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Confirmation Button */}
                <div className="text-center mt-4">
                    {bookingConfirmed ? (
                        <Alert variant="success" className="mt-3">
                            Booking Confirmed! Redirecting to the success page...
                        </Alert>
                    ) : (
                        <Button type='primary' onClick={confirmBooking} className="my-3 confirm-button">Confirm booking</Button>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default BookingSummary;