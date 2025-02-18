import React, { useEffect, useState } from "react";
import "../SubCategoriesCard.css"

// import { Container, Row, Col } from "react-bootstrap";

import TourCategoryCard from "./TourCategorieCard";
import { useLocation } from "react-router-dom";

export default function TourCategories() {
    const location = useLocation();
    const {subCatName, subCatImagePath,subCatMasterId} = location.state || {};
    console.log(subCatMasterId)
    const [tour, setTour] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
        useEffect(() => {
            if (subCatMasterId) {
                fetch(`http://localhost:8086/api/subcategory/${subCatMasterId}/tours`)
                    .then(response => response.json())
                    .then(data => setTour(data))
                    .catch(error => console.error("Error fetching subcategories:", error));
            }
        }, [subCatMasterId]);
         console.log(tour)

    return (
        
            <div className="subcategories-tour-container">
            <div className="header" style={{ backgroundImage: `url(${subCatImagePath})` }}>
                <div className="overlay"></div>
                <h1 className="tour-name">{subCatName}</h1>
            </div>
            <div className="subcategories-details  ">
                            {tour.map((tourData, index) => (
                                <div key={index} xs={12} sm={6} md={4} className="mb-4">
                                    <TourCategoryCard {...tourData} />
                                </div>
                            ))}
            </div>
        </div>
    );
}
