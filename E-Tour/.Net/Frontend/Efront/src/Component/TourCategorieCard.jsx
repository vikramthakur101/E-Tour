import React from "react";
import { Card, Button } from "react-bootstrap";
import "../SubCategoriesCard.css";
import { useNavigate } from "react-router-dom";

    

const TourCategoryCard = ({ tourId,durationDays,durationNights,endDate,
    imageUrl,price,startDate,tourName,subcategoryMaster }) => {
    const navigate = useNavigate();
    const handleViewDetails = () => {
        // navigate('/itinerary', { state: { tourName, imageurl, tourId,subcategoryMaster} });
        navigate('/itinerary', { state: {tourId, tourName, 
            imageUrl, durationDays, durationNights, price, subcategoryMaster,endDate,startDate } });
    };
    console.log("Tourid="+tourId)



    return (
        <Card className="package-card">
            <Card.Img variant="top" src={
imageUrl} className="package-image"/>
            <Card.Body className="package-description">
                <Card.Title className="package-title">{tourName}</Card.Title>
                <Card.Text className="package-text">
                    <strong>{durationDays} Days / {durationNights} Nights</strong>
                    <br />
                    {/* <strong>starts:{startDate} Ends:{endDate} </strong> */}
                    {/* <div className="description-text">
                        {description}
                    </div> */}
                </Card.Text>
                {/* <h5 className="package-price">₹{price}</h5> */}
                <Button variant="primary" className="mt-2" onClick={handleViewDetails}>
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
};

export default TourCategoryCard;
