import React from 'react';
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function SubCategoriesCard({ subCatName, subCatImagePath, subCatMasterId,}) {
    const navigation = useNavigate();

    const handlenavigation = () => {
        navigation('/tourCategories', { state: { subCatName, subCatImagePath,subCatMasterId } });
    }
    

    return (
        <Card className="package-card">
            <Card.Img variant="top" src={subCatImagePath} className="package-image" />
            <Card.Body className="package-description">
                <Card.Title className="package-title">{subCatName}</Card.Title>
                <Button variant="primary" className="explore-btn" onClick={handlenavigation}>
                    Explore
                </Button>
            </Card.Body>
        </Card>
    );
};
