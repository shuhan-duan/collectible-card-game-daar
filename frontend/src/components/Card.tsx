import React from 'react';
import '../css/Card.css'; // Import your CSS file for styling

interface CardProps {
    imageUrl: string;
}

const Card: React.FC<CardProps> = ({ imageUrl }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt="Card" className="card-image" />
        </div>
    );
};

export default Card;
