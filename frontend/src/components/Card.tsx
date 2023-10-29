import React, {useEffect, useState} from 'react';
import '../css/Card.css';
import CardPopup from "@/components/CardPopup";
import axios from "axios"; // Import your CSS file for styling

interface CardProps {
    imageUrl: string;
    cardData: number;
}

interface CardInfo {
    gid: string;
    cid: string;
    n: string;
    t: string;
    col: string;
    cs: string;
    tr: string;
    a: string;
    p: string;
    cp: any;
    l: any;
    r: string;
    ar: any;
    iu: string;
    e: string;
    al: any;
    intl: string;
    srcN: string;
    scrD: any;
}

const Card: React.FC<CardProps> = ({ imageUrl, cardData }) => {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [cardJson, setCardJson] = useState<CardInfo | null>(null);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    useEffect(() => {
        // Fetch data from an API using Axios
        axios.get(`http://localhost:3000/api/cards/getInfo/${cardData}`)
            .then((response) => {
                setCardJson(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="card">
            <img src={imageUrl} alt="Card" className="card-image" onClick={openPopup}/>
            {cardJson && isPopupOpen && (
                <CardPopup
                    cardImg={imageUrl}
                    cardData={cardJson}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default Card;
