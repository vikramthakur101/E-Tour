import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
  Form,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";

import "./Profile.css";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const email = localStorage.getItem("email");
  console.log(email);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8086/api/customers/check/${email}`)
        .then(async (response) => {
          const text = await response.text();
          return text ? JSON.parse(text) : {};
        })
        .then((data) => {
          console.log("Fetched Customer Data:", data);
          setCustomer(data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [email]);
  console.log(customer);

  return (
    <Container className="profile-page mt-5">
      <Row>
        {/* Sidebar Section */}
        <Col md={3} className="mb-4">
          <Card className="profile-sidebar shadow-sm">
            <Card.Body className="text-center">
              <div className="profile-picture mb-3">
                <img
                  src="/Images/shruti.jpg"
                  alt="Profile"
                  className="img-fluid rounded-circle border border-4 border-primary"
                />
              </div>
              <h5 className="profile-name mb-1">
                {customer
                  ? customer.firstName + " " + customer.lastName
                  : "Loading..."}
              </h5>
              <p className="profile-email text-muted mb-3">
                {customer ? customer.email : "Loading..."}
              </p>
              {/* <ProgressBar now={75} label="75%" className="mb-3" variant="success" /> */}
              {/* <ListGroup variant="flush">
                                <ListGroup.Item action href="#personal-info"><i className="fas fa-user-circle me-2"></i>Personal Info</ListGroup.Item>
                                <ListGroup.Item action href="#bookings"><i className="fas fa-calendar-alt me-2"></i>My Bookings</ListGroup.Item>
                                <ListGroup.Item action href="#rewards"><i className="fas fa-gift me-2"></i>Rewards & Wallet</ListGroup.Item>
                                <ListGroup.Item action href="#settings"><i className="fas fa-cog me-2"></i>Settings</ListGroup.Item>
                            </ListGroup> */}
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content Section */}
        <Col md={9}>
          <Tabs
            defaultActiveKey="personal-info"
            id="profile-tabs"
            className="mb-3"
          >
            {/* Personal Info Tab */}
            <Tab eventKey="personal-info" title="Personal Info">
              <Card className="profile-content shadow-sm">
                <Card.Body>
                  <h4 className="mb-4">Personal Information</h4>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={customer?.firstName || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={customer?.lastName || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={customer?.email || ""}
                        disabled
                      />
                    </Form.Group>
                    {/* <Form.Group className="mb-3"> */}
                      {/* <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        value={customer?.phoneNumber1 || ""}
                        disabled
                      />
                    </Form.Group> */}
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
