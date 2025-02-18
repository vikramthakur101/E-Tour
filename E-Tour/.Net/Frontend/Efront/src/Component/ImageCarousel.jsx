import React from "react";
import { Carousel } from "react-bootstrap";

export default function ImageCarousel({ slides }) {
    return (
        <Carousel>
            {slides.map((slide, index) => (
                <Carousel.Item key={index} interval={2000}>
                    <img
                        className="d-block w-100"
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        style={{ objectFit: "cover", height: "80vh", width: "100vw" }}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
} 