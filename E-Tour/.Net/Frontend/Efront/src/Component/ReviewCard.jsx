import React from "react";
import { Card } from "react-bootstrap";

export default function ReviewCard({ name, review, image }) {
  return (
    
    <Card style={{ width: "18rem", margin: "1rem", textAlign: "center" }}>
      <Card.Img
        variant="top"
        src={image}
        style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "auto", marginTop: "1rem" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>"{review}"</Card.Text>
      </Card.Body>
    </Card>
  );
}
