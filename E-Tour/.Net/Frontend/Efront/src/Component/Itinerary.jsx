import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../SubCategoriesCard.css';
import ItineraryCard from './ItineraryCard';
import { Container, Button, Card } from 'react-bootstrap';
import LoginForm from './LoginForm';

export default function Itinerary() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [itineraryData, setItineraryData] = useState([]);
    const [departureDates, setDepartureDates] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [i18lag, setI18Lang] = useState("en");
    const [profiledata, setProfileData] = useState({})
    const { tourName, imageUrl, price, durationDays, durationNights, tourId, subcategoryMaster ,id,title} = location.state || {};
    const email = localStorage.getItem("email")
    const customername = `${profiledata.firstName}${profiledata.lastName}`;
    const customerId = profiledata.customerid
    const handleBookNow = () => {

        if (email) {
            fetch(`http://localhost:8086/api/customers/check/${email}`)
                .then(async (response) => {
                    const text = await response.text();
                    return text ? JSON.parse(text) : {};
                })
                .then((data) => {
                    console.log("Fetched Customer Data:", data);
                    setProfileData(data);
                })
                .catch((error) => {
                    console.error("Error fetching profile data:", error);
                });
        } else {
            setShowLogin(true);
        }
    };


    
    
    useEffect(() => {
        if (profiledata && Object.keys(profiledata).length > 0) {
            navigate('/booking', { 
                state: { tourName, imageUrl, price, durationDays, durationNights, tourId, subcategoryMaster, selectedStartDate, selectedEndDate, profiledata ,tourId,customername,customerId,imageUrl}
            });
        }
    }, [profiledata]); 
    // console.log("profiledata",profiledata)
    

    const handleCloseLogin = () => setShowLogin(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (tourId) {
            fetch(`http://localhost:8086/api/subcategory/${subcategoryMaster}/tours/${tourId}/itenary?lang=${i18lag}`)
                .then(response => response.json())
                .then(data => setItineraryData(data))
                .catch(error => console.error("Error fetching itinerary:", error));
        }else if(id){ fetch(`http://localhost:8086/api/subcategory/2/tours/${id}/itenary?lang=${i18lag}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            setItineraryData(data);
        })
        .catch(error => console.error("Error fetching itinerary:", error));
    }
    }, [tourId, subcategoryMaster, i18lag, id]);

    
    
    
    useEffect(() => {
        fetch(`http://localhost:8086/api/subcategory/${subcategoryMaster}/tours/${tourId}/departures`)
            .then(response => response.json())
            .then(data => {

                const formattedDates = data.map(dateStr => {
                    const [start, end] = dateStr.split(" - ");
                    return { start: start.trim().substring(0, 10), end: end.trim().substring(0, 10) };
                });
                setDepartureDates(formattedDates);
            })
            .catch(error => console.error("Error fetching departure dates:", error));
    }, [subcategoryMaster, tourId]);

    const handleDateChange = (e) => {
        const selectedStart = e.target.value;
        const selectedDateObj = departureDates.find(date => date.start === selectedStart);
        if (selectedDateObj) {
            setSelectedStartDate(selectedDateObj.start);
            setSelectedEndDate(selectedDateObj.end);
        }
    };


    const handleLanguageChange = (e) => {
        setI18Lang(e.target.value);
    };

    return (
        <div className="subcategories-tour-container">
            <div className="header" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="overlay"></div>
                <h1 className="tour-name">{tourName}{title}</h1>
            </div>
            <Container className="py-5">
                <div className="mb-3" style={{ display: 'flex', justifyContent: "space-between", marginInline: '0.5rem', width: '99%', alignItems: "center" }}>
                    <div>
                        <Card.Title className="text-primary" style={{ fontSize: '2rem' }}>Day Wise Itinerary</Card.Title>
                    </div>
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <Card.Title className="text-primary" style={{ fontSize: '1.5rem', whiteSpace: "nowrap" }}>
                            Departure Date:
                        </Card.Title>
                        <select
                            onChange={handleDateChange}
                            value={selectedStartDate}
                            style={{
                                height: '2rem', fontSize: '1rem', padding: "2px 8px", borderRadius: "5px", border: "1px solid #ccc", outline: "none", cursor: "pointer", textAlign: "center",
                            }}
                        >
                            <option value="" disabled>Select date </option>
                            {departureDates.map((date, index) => (
                                <option key={index} value={date.start}>
                                    {date.start}
                                </option>
                            ))}
                        </select>
                        <Card.Title className="text-primary" style={{ fontSize: '1.5rem', whiteSpace: "nowrap", paddingInline: '1rem' }}>
                            End date: {selectedEndDate}
                        </Card.Title>

                        <Card.Title className="text-primary" style={{ fontSize: '1.5rem', whiteSpace: "nowrap", paddingLeft: '1rem' }}>
                            Language: 
                        </Card.Title>
                        <select onChange={handleLanguageChange}
                            value={i18lag}
                            style={{
                                height: '2rem',fontSize: '1rem', padding: "2px 8px", borderRadius: "5px", border: "1px solid #ccc", outline: "none", cursor: "pointer", textAlign: "center",
                            }}>
                            <option value="en">English</option>
                            <option value="mr">Marathi</option>
                            <option value="hi">Hindi</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                        </select>
                    </div>
                </div>

                {itineraryData.length > 0 ? (
                    itineraryData.map((item, index) => (
                        <ItineraryCard key={index} {...item} />
                    ))
                ) : (
                    <p>No itinerary available.</p>
                )}

                <Button className="mt-4 w-100" onClick={handleBookNow}>
                    Book Now
                </Button>
            </Container>
            <LoginForm show={showLogin} handleClose={handleCloseLogin} setLoggedIn={setLoggedIn} />
        </div>
    );
}
