import React from "react";
import ContactDetails from "./ContactDetails";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReviewPackage.css";
import BookingPage from "./BookingPage";
import './ReviewPackage.css';

const ReviewPackage = () => {
  const packageDetails = {
    name: "4N - Most Wanted Kerala Package",
    duration: "5D/4N (Munnar, Thekkady, Alleppey)",
    price: 68816,
  };

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="jumbotron text-white p-5 mb-4 hero-section">
      <h1 className="package-title">{packageDetails.name}</h1>
<p className="package-duration">{packageDetails.duration}</p>
<p className="package-price">₹{packageDetails.price.toLocaleString()}</p>

      </div>

      <BookingPage />

      {/* Closing the container div properly */}
    </div>
  );
};

export default ReviewPackage;