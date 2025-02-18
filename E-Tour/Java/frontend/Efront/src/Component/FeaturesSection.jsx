import React from "react";
import '../Features.css'

const features = [
    {
        icon: "✈️",
        title: "50+ DESTINATIONS",
        description: "",
    },
    {
        icon: "💰",
        title: "BEST PRICE GUARANTEE",
        
    },
    {
        icon: "🎧",
        title: "GREAT CUSTOMER",
        
    },
    {
        icon: "📅",
        title: "SUPER FAST BOOKING",
        
    },
];

export default function FeatureSection() {
    return (
        <div className="feature-container">
            {features.map((feature, index) => (
                <div key={index} className="feature-box">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                        <h3>{feature.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
