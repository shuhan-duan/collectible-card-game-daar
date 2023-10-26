// Collections.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Collections.css'
import Header from "@/components/Header";
import Card from "@/components/Card";

interface CollectionItem {
    collectionId: number;
    collectionName: string;
    cardCount: number;
    cards: CardItem[];
}

interface CardItem {
    img: string;
    cardNumber: number;
}

const Collections: React.FC = () => {
    const [collectionData, setCollectionData] = useState<CollectionItem[] | null>(null);

    useEffect(() => {
        // Fetch data from an API using Axios
        axios.get('http://localhost:3000/api/collections/get')
            .then((response) => {
                setCollectionData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (collectionData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-content">
            <Header/>
            <h2>Collections</h2>

            <div className="collection">
                <div className="collection-left" >
                    <ul>
                        {collectionData.map((item) => (
                                <li key={item.collectionId}>
                                    <a href="#" >{item.collectionName}</a>
                                </li>
                        ))}
                    </ul>
                </div>
                <div className="collection-right">
                    {collectionData.map((item) => (
                        <div className="collection-block">
                        {item.cards.map((card) => (
                                <Card key={card.cardNumber} imageUrl={card.img} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
