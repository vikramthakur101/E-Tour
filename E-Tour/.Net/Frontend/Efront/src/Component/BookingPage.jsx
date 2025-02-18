import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    email: "",
    passengerType: "Extra Person",
    price: "",
    baseAmount: "",
    taxAmount: "",
  });
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceList, setPriceList] = useState({});
  const [bookingDate, setBookingDate] = useState("");
  const GST_RATE = 0.05;

  const location = useLocation();
  const {
    durationDays,
    imageUrl,
    durationNights,
    selectedStartDate,
    selectedEndDate,
    tourName,
    tourId,
    subcategoryMaster,
    profiledata,
    customername,
    customerId,
  } = location.state || {};

  // Fetch price list on component mount
  useEffect(() => {
    fetch(
      `http://localhost:8086/api/subcategory/${subcategoryMaster}/tours/${tourId}/itenary/booking`
    )
      .then((response) => response.json())
      .then((data) => setPriceList(data))
      .catch((error) => console.error("Error fetching prices:", error));
  }, [subcategoryMaster, tourId]);

  // Save passengers and total price to localStorage
  useEffect(() => {
    localStorage.setItem("passengers", JSON.stringify(passengers));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
  }, [passengers, totalPrice]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "passengerType") {
      const basePrices = {
        "Twin Sharing": priceList.twinSharingcost || 0,
        "Extra Person": priceList.extraPersonCost || 0,
        "Child with Bed": priceList.childWithBed || 0,
        "Child without Bed": priceList.childWitoutBed || 0,
        "Single Person": priceList.singlePersonCost || 0,
      };
      const basePrice = basePrices[value] || 0;
      const taxAmount = basePrice * GST_RATE;
      const totalCost = basePrice + taxAmount;
      updatedData.price = totalCost.toFixed(2);
      updatedData.baseAmount = basePrice.toFixed(2);
      updatedData.taxAmount = taxAmount.toFixed(2);
    }

    setFormData(updatedData);
    setErrors({ ...errors, [name]: "" }); // Clear error for the field
  };

  // Validate form fields
  const validateForm = () => {
    const { firstName, lastName, mobile, email, dob } = formData;
    const nameRegex = /^[A-Za-z]+$/;
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const newErrors = {};

    if (!nameRegex.test(firstName)) {
      newErrors.firstName = "First Name should contain only letters.";
    }
    if (!nameRegex.test(lastName)) {
      newErrors.lastName = "Last Name should contain only letters.";
    }
    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Mobile number should be exactly 10 digits.";
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!dob || new Date(dob) > new Date()) {
      newErrors.dob = "Date of Birth cannot be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Add a new passenger
  const handleAddPassenger = () => {
    if (!validateForm()) return;

    setPassengers([...passengers, formData]);
    setTotalPrice((prevTotal) => prevTotal + parseFloat(formData.price));
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      mobile: "",
      email: "",
      passengerType: "Extra Person",
      price: "",
      baseAmount: "",
      taxAmount: "",
    });
  };

  // Remove a passenger
  const handleRemovePassenger = (index) => {
    const updatedPassengers = [...passengers];
    const removedPassenger = updatedPassengers.splice(index, 1)[0];
    setPassengers(updatedPassengers);
    setTotalPrice((prevTotal) => prevTotal - parseFloat(removedPassenger.price));
  };

  // Navigate to booking summary
  const navigate = useNavigate();
  const confirmBooking = () => {
    const totalBaseAmount = passengers
      .reduce((sum, passenger) => sum + parseFloat(passenger.baseAmount), 0)
      .toFixed(2);
    const totalTaxAmount = passengers
      .reduce((sum, passenger) => sum + parseFloat(passenger.taxAmount), 0)
      .toFixed(2);
    const bookingDate = new Date().toLocaleDateString();
    setBookingDate(bookingDate);

    navigate("/bookingsummary", {
      state: {
        durationDays,
        durationNights,
        selectedStartDate,
        selectedEndDate,
        tourName,
        profiledata,
        totalBaseAmount,
        totalTaxAmount,
        totalPrice,
        passengerCount: passengers.length,
        tourId,
        customername,
        customerId,
        bookingDate,
        imageUrl,
      },
    });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div
        className="header"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          padding: "50px 0",
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <h1 className="tour-name" style={{ position: "relative", zIndex: 1 }}>
          {tourName}
        </h1>
      </div>
      <Container
        className="mt-4 p-4 border rounded"
        style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Card className="mb-4 p-3 shadow-sm border rounded" style={{ backgroundColor: "#e3f2fd" }}>
          <Card.Body>
            <Card.Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              🗓️ Days: {durationDays} | 🌙 Nights: {durationNights} | 📅 {selectedStartDate} - {selectedEndDate}
            </Card.Text>
          </Card.Body>
        </Card>
        <h2 className="text-center" style={{ color: "#007bff" }}>
          Passenger Details
        </h2>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mb-3"
              />
              {errors.firstName && <Alert variant="danger">{errors.firstName}</Alert>}
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mb-3"
              />
              {errors.lastName && <Alert variant="danger">{errors.lastName}</Alert>}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mb-3"
              />
              {errors.mobile && <Alert variant="danger">{errors.mobile}</Alert>}
            </Col>
            <Col md={6}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-3"
              />
              {errors.email && <Alert variant="danger">{errors.email}</Alert>}
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mb-3"
              />
              {errors.dob && <Alert variant="danger">{errors.dob}</Alert>}
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                name="passengerType"
                value={formData.passengerType}
                onChange={handleChange}
                className="mb-3"
              >
                <option disabled>Passenger Type</option>
                <option>Twin Sharing</option>
                <option>Extra Person</option>
                <option>Child with Bed</option>
                <option>Child without Bed</option>
                <option>Single Person</option>
              </Form.Control>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                disabled
                className="mb-3"
              />
            </Col>
          </Row>
          <Button
            className="mt-3"
            onClick={handleAddPassenger}
            style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
          >
            Add Passenger
          </Button>
        </Form>
        {passengers.length > 0 && (
          <>
            <h3 className="mt-4">Passenger Details</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DOB</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Passenger Type</th>
                  <th>Price (with GST)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((passenger, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{passenger.firstName}</td>
                    <td>{passenger.lastName}</td>
                    <td>{passenger.dob}</td>
                    <td>{passenger.mobile}</td>
                    <td>{passenger.email}</td>
                    <td>{passenger.passengerType}</td>
                    <td>₹{passenger.price}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemovePassenger(index)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              type="primary"
              onClick={confirmBooking}
              className="my-3"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            >
              Confirm Booking
            </Button>
            <h4>Total Price (including GST): ₹{totalPrice.toFixed(2)}</h4>
          </>
        )}
      </Container>
    </div>
  );
};

export default BookingPage;