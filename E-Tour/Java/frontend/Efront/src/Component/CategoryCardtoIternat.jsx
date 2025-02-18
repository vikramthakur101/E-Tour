import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CategoryCardtoIternat = ({ title, imageUrl, id, text, buttonLabel }) => {
    const navigate = useNavigate(); // ✅ Fixed function name

    const handleNavigation = () => {
      navigate('/itinerary', { state: { subCatMasterId :2,tourId: 9, title ,imageUrl }});

    };
    

    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant="primary" onClick={handleNavigation}> 
                    {buttonLabel}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CategoryCardtoIternat;
