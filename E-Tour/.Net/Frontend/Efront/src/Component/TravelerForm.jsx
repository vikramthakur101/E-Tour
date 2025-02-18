import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const TravelerForm = ({ onChildCountChange, onTotalAmountChange,childwithbedprice,childwithoutbedprice,price,TwinSharingcost,SingleAdultPrice }) => {
  const [isSharing, setIsSharing] = useState(true); // 'true' for sharing
  const [isSingle, setIsSingle] = useState(false); // 'false' for single
  const [bookingFor, setBookingFor] = useState('self'); // 'self' or 'someone'

  const [formData, setFormData] = useState({
    1: { firstName: '', lastName: '', email: '', dob: '', gender: '' },
    2: { firstName: '', lastName: '', email: '', dob: '', gender: '' },
  });

  const [childWithBed, setChildWithBed] = useState(0);
  const [childWithoutBed, setChildWithoutBed] = useState(0);

  const [showTraveler, setShowTraveler] = useState(null); 

  const myDetails = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dob: '1995-01-01',
    gender: 'Male',
  };

  const handleBookingChange = (value) => {
    setBookingFor(value);
    if (value === 'self') {
      setFormData({
        1: { ...myDetails },
        2: { ...myDetails },
      });
    } else {
      setFormData({
        1: { firstName: '', lastName: '', email: '', dob: '', gender: '' },
        2: { firstName: '', lastName: '', email: '', dob: '', gender: '' },
      });
    }
  };

  const handleInputChange = (traveler, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [traveler]: { ...prev[traveler], [field]: value },
    }));
  };

  const handleSharingChange = (e) => {
    setIsSharing(e.target.checked);
    if (e.target.checked) setIsSingle(false); 

  };

  const handleSingleChange = (e) => {
    setIsSingle(e.target.checked);
    if (e.target.checked) setIsSharing(false); 
    
  };

  const handleTravelerToggle = (traveler) => {
    setShowTraveler(showTraveler === traveler ? null : traveler); 
  };
  

  // Send child count changes and total amount changes
  useEffect(() => {
    if (onChildCountChange) {
      onChildCountChange(childWithBed, childWithoutBed);
    }
    
    if (onTotalAmountChange) {
      const childWithBedCost = childwithbedprice;
      const childWithoutBedCost = childwithoutbedprice;
      const baseFarePerAdult = price;
      // const numAdults = 2;
      
      const totalChildCost = (childWithBed * childWithBedCost) + (childWithoutBed * childWithoutBedCost);
      const totalAdultCost = baseFarePerAdult ;
      const subtotal = totalAdultCost + totalChildCost;
      const tax = subtotal * 0.05; 
      const grandTotal = subtotal  + tax;

      onTotalAmountChange(grandTotal);
    }
  }, [childWithBed, childWithoutBed, onChildCountChange, onTotalAmountChange]);

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-between align-items-center mb-4">
        <Col xs={9}>
          <h2 className="text-primary">Traveler Information</h2>
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          <div className="me-4">
            <Form.Check
              type="checkbox"
              label="Two Adults"
              checked={isSharing}
              onChange={handleSharingChange}
            />
            <span>₹{TwinSharingcost}</span>
          </div>
          <div>
            <Form.Check
              type="checkbox"
              label="Single"
              checked={isSingle}
              onChange={handleSingleChange}
            />
            <span>₹{SingleAdultPrice}</span>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form.Check
            type="radio"
            label="I'm Booking For Myself"
            name="bookingFor"
            checked={bookingFor === 'self'}
            onChange={() => handleBookingChange('self')}
            className="mb-2"
          />
        </Col>
        <Col>
          <Form.Check
            type="radio"
            label="I’m Booking For Someone Else"
            name="bookingFor"
            checked={bookingFor === 'someone'}
            onChange={() => handleBookingChange('someone')}
            className="mb-2"
          />
        </Col>
      </Row>

      {/* Traveler 1 Details */}
      <Row className="mb-4">
        <Col>
          <Button
            variant="link"
            onClick={() => handleTravelerToggle(1)}
            className="text-decoration-none"
          >
            <h5 className="text-primary">Traveler 1 Details</h5>
          </Button>
          <p className="text-muted">Adult - Should be above 18 years</p>

          {showTraveler === 1 && !isSingle && (
            <Card className="p-4 mb-3 shadow-lg">
              <h5 className="text-info">Traveler 1 Form</h5>

              {['firstName', 'lastName', 'email', 'dob', 'gender'].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>
                    {field === 'firstName' ? 'First Name' : field === 'lastName' ? 'Last Name' : field === 'dob' ? 'Date of Birth' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </Form.Label>

                  {field === 'gender' ? (
                    <Form.Select
                      value={formData[1][field]}
                      onChange={(e) => handleInputChange(1, field, e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  ) : (
                    <Form.Control
                      type={field === 'dob' ? 'date' : 'text'}
                      value={formData[1][field]}
                      onChange={(e) => handleInputChange(1, field, e.target.value)}
                      placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    />
                  )}
                </Form.Group>
              ))}

              <Button variant="success">Save</Button>
            </Card>
          )}
        </Col>
      </Row>

      {/* Traveler 2 Details (Only if it's not "Single") */}
      {!isSingle && (
        <Row className="mb-4">
          <Col>
            <Button
              variant="link"
              onClick={() => handleTravelerToggle(2)}
              className="text-decoration-none"
            >
              <h5 className="text-primary">Traveler 2 Details</h5>
            </Button>
            <p className="text-muted">Adult - Should be above 12 years</p>

            {showTraveler === 2 && (
              <Card className="p-4 mb-3 shadow-lg">
                <h5 className="text-info">Traveler 2 Form</h5>

                {['firstName', 'lastName', 'email', 'dob', 'gender'].map((field) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label>
                      {field === 'firstName' ? 'First Name' : field === 'lastName' ? 'Last Name' : field === 'dob' ? 'Date of Birth' : field.charAt(0).toUpperCase() + field.slice(1)}
                    </Form.Label>

                    {field === 'gender' ? (
                      <Form.Select
                        value={formData[2][field]}
                        onChange={(e) => handleInputChange(2, field, e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={field === 'dob' ? 'date' : 'text'}
                        value={formData[2][field]}
                        onChange={(e) => handleInputChange(2, field, e.target.value)}
                        placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      />
                    )}
                  </Form.Group>
                ))}

                <Button variant="success">Save</Button>
              </Card>
            )}
          </Col>
        </Row>
      )}

      {/* Child Count Section (Remains Unchanged) */}
      {(isSharing || isSingle) && (
        <Row className="mb-4">
          <Col>
            <h5 className="text-secondary">Children</h5>
            <div className="mb-3">
              <strong>Child with Bed {childwithbedprice}: </strong>
              <InputGroup size="sm" className="w-25">
                <Button variant="outline-secondary" disabled={childWithBed === 0} onClick={() => setChildWithBed(childWithBed - 1)}>-</Button>
                <FormControl value={childWithBed} readOnly />
                <Button variant="outline-secondary" onClick={() => setChildWithBed(childWithBed + 1)}>+</Button>
              </InputGroup>
            </div>

            <div className="mb-3">
              <strong>Child without Bed {childwithoutbedprice}: </strong>
              <InputGroup size="sm" className="w-25">
                <Button variant="outline-secondary" disabled={childWithoutBed === 0} onClick={() => setChildWithoutBed(childWithoutBed - 1)}>-</Button>
                <FormControl value={childWithoutBed} readOnly />
                <Button variant="outline-secondary" onClick={() => setChildWithoutBed(childWithoutBed + 1)}>+</Button>
              </InputGroup>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TravelerForm;