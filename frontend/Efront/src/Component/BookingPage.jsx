import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  Card,
} from "react-bootstrap";
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
    passengerType: "",
    price: "",
    baseAmount: "",
    taxAmount: "",
  });

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
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceList, setPriceList] = useState({});
  const [bookingDate, setBookingDate] = useState("");
  const GST_RATE = 0.05;
  //     console.log("subcategoryMaster:", subcategoryMaster);
  // console.log("tourId:", tourId);

  console.log("Location state:", location.state);
  useEffect(() => {
    fetch(
      `http://localhost:8086/api/subcategory/${subcategoryMaster}/tours/${tourId}/itenary/booking`
    )
      .then((response) => response.json())
      .then((data) => {
        setPriceList(data);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  console.log("pricelist", priceList);

  useEffect(() => {
    localStorage.setItem("passengers", JSON.stringify(passengers));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
  }, [passengers, totalPrice]);

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
  };

  const validateForm = () => {
    const { firstName, lastName, mobile, email, dob } = formData;
    const nameRegex = /^[A-Za-z]+$/;
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("First Name and Last Name should contain only letters.");
      return false;
    }
    if (!mobileRegex.test(mobile)) {
      alert("Mobile number should be exactly 10 digits.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Enter a valid email address.");
      return false;
    }
    if (!dob || new Date(dob) > new Date()) {
      alert("Date of Birth cannot be in the future.");
      return false;
    }
    return true;
  };

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

  const handleRemovePassenger = (index) => {
    const updatedPassengers = [...passengers];
    const removedPassenger = updatedPassengers.splice(index, 1)[0];
    setPassengers(updatedPassengers);
    setTotalPrice(
      (prevTotal) => prevTotal - parseFloat(removedPassenger.price)
    );
  };

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
    <div>
      <div className="header" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="overlay"></div>
        <h1 className="tour-name">{tourName}</h1>
      </div>
      <Container className="mt-4 p-4 border rounded bg-light">
        <Card className="mb-4 p-3 shadow-sm mt-4 p-4 border rounded bg-light">
          <Card.Body>
            {/* <Card.Title className="text-primary">{tourName}</Card.Title> */}
            <Card.Text>
              Days: {durationDays} & Nights: {durationNights} | Start Date:{" "}
              {selectedStartDate} - End Date: {selectedEndDate}
            </Card.Text>
          </Card.Body>
        </Card>
        <h2 className="text-center">Passenger Details</h2>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Passenger Type</Form.Label>
                <Form.Control
                  as="select"
                  name="passengerType"
                  value={formData.passengerType}
                  onChange={handleChange}
                >
                  <option checked disabled>
                    passenger type
                  </option>
                  <option>Twin Sharing</option>
                  <option>Extra Person</option>
                  <option>Child with Bed</option>
                  <option>Child without Bed</option>
                  <option>Single Person</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Price (with GST)</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3" onClick={handleAddPassenger}>
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
                      <Button
                        variant="danger"
                        onClick={() => handleRemovePassenger(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button type="primary" onClick={confirmBooking} className="my-3">
              Confirm booking
            </Button>
            <h4>Total Price (including GST): ₹{totalPrice.toFixed(2)}</h4>
          </>
        )}
      </Container>
    </div>
  );
};

export default BookingPage;
