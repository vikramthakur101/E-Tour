import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaPinterestP,
    FaVimeoV,
} from "react-icons/fa6";
import "../Footer.css";

const destinations = [
    {
        name: "Africa",
        image:
            "https://plus.unsplash.com/premium_photo-1661936361131-c421746dcd0d?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "America",
        image:
            "https://images.unsplash.com/photo-1473167052083-3d31fa1f6776?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Asia",
        image:
            "https://images.unsplash.com/photo-1561969310-fa2e856250ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Eastern Europe",
        image:
            "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Europe",
        image:
            "https://plus.unsplash.com/premium_photo-1690372791935-3efc879e4ca3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "South America",
        image:
            "https://images.unsplash.com/photo-1567597243073-2d274aabecec?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export default function Footer() {
    return (
        <footer className="footer-section" id="contact">
            <Container>
                <Row className="py-5 text-white">
                    <Col md={4}>
                        <h4 className="footer-logo">
                            <span style={{ color: "#3D8BFD" }}>TRAVEL</span>VISTA
                        </h4>
                        <p>
                            Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia, there live the blind texts.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5 className="text-uppercase mb-3">Top Destinations</h5>
                        <div className="destinations-grid">
                            {destinations.map((dest, index) => (
                                <div
                                    key={index}
                                    className="destination-card"
                                    style={{ backgroundImage: `url(${dest.image})` }}
                                >
                                    <span>{dest.name}</span>
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col md={4}>
                        <h5 className="text-uppercase mb-3">Contact Info</h5>
                        <p>
                            <strong>Address:</strong> SM VITA, Gulmohar Road, MHADA Colony,
                            Vile Parle West, Mumbai, Maharashtra 400049{" "}
                        </p>
                        <p>
                            <strong>Phone:</strong> +91 9324095272
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            <a href="mailto:tourvista318@gmail.com" className="email-link">
                                tourvista318@gmail.com
                            </a>
                        </p>
                        <div className="social-icons">
                            <FaFacebookF />
                            <FaXTwitter />
                            <FaLinkedinIn />
                            <FaPinterestP />
                            <FaVimeoV />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
