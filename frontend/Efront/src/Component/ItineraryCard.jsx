import { Card, Row, Col } from "react-bootstrap";
import React from "react";

const ItineraryCard = ({ dayNo, description, imageUrl }) => {
    
    return (
        <Card className="mb-4 shadow-sm">
            <Row className="g-0">
                <Col md={8} className="p-3">
                    <Card.Body>
                        <Card.Title className="text-primary">Day {dayNo}</Card.Title>
                        <Card.Text>{description || "No description available."}</Card.Text>
                    </Card.Body>
                </Col>
                <Col md={4}>
                    {imageUrl && <Card.Img variant="top" src={imageUrl} alt={`Day ${dayNo}`} style={{ 
                        height: "7rem",
                        width:"50%" ,
                        marginLeft:"10rem",
                        marginBlock:"1rem"
                        
                    }} className="img-fluid" />}
                </Col>
            </Row>
        </Card>
    );
};

export default ItineraryCard;

