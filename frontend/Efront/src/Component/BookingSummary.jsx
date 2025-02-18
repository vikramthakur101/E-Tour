import React, { useEffect, useState } from "react";
import { Container, Card, Table, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

const BookingSummary = () => {
    const [passengers, setPassengers] = useState([]);
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
        bookingDate,imageUrl
    } = location.state || {};

    console.log("location state of booking summary",location.state)

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

    console.log("State data:", {
        tourId,
        totalBaseAmount,
        totalPrice,
        totalTaxAmount,
        passengerCount,
        customername,
        customerId,
        tourName,
        email,
        bookingDate,imageUrl
    });

    return (
        <div>
            <div className="header" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="overlay"></div>
                <h1 className="tour-name">{tourName}</h1>
            </div>
        
        <Container className="mt-4 p-4 border rounded bg-light">
            <h2 className="text-center mb-4">Booking Summary</h2>

            {/* Tour Details */}
            <Card className="mb-4 p-3 shadow-sm">
                <Card.Body>
                    {/* <Card.Title className="text-primary">{tourName}</Card.Title> */}
                    <Card.Text>
                        {durationDays} & {durationNights} |
                        Start Date: {selectedStartDate} - End Date: {selectedEndDate},
                        
                    </Card.Text>
                    
                </Card.Body>
            </Card>

            {/* Profile Details */}
            <Card className="mb-4 p-3 shadow-sm">
                <Card.Body>
                    <Card.Title>Profile Details</Card.Title>
                    <Row>
                        <Col md={6}>
                            <strong>Name:</strong> {profiledata.firstName} {profiledata.lastName}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={6}>
                            <strong>Email:</strong> {email}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Passenger Details Table */}
            <Card className="mb-4 p-3 shadow-sm">
                <Card.Body>
                    <Card.Title>Passengers</Card.Title>
                    <Table striped bordered hover>
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

            {/* Total Price */}
            <Card className="p-3 shadow-sm text-center" style={{display:'felx', flexDirection:'row' ,justifyContent:'space-around'}}>
                <p>Base Price: ₹{totalBaseAmount}</p>
                <p>Tax Price: ₹{totalTaxAmount}</p>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Total Passengers: {passengerCount}</p>
            </Card>
            <Button type='primary' onClick={confirmBooking} className="my-3">Confirm booking</Button>
        </Container>
        </div>
    );
};

export default BookingSummary;
