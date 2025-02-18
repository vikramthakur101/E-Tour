import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CategoriesCard  ({ title, imageUrl, buttonLabel, buttonLink,text,id })  {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/SubCategories`, { state: { title,imageUrl,id} });
  };
  
  return (
      <Card style={{ width: '18rem', margin: '1rem' }}>
          <Card.Img variant="top" src={imageUrl} />
          <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{text}</Card.Text>
              <Button variant="primary" href={buttonLink} onClick={handleNavigation}> 
                {buttonLabel}
              </Button>
          </Card.Body>
      </Card>
  );
};