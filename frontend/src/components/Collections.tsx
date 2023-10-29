// Collections.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Collections.css'
import Header from "@/components/Header";
import Card from "@/components/Card";
import CardPopup from "@/components/CardPopup";
import {Collection} from "$/src";

interface CollectionProps {
    wallet : any
}

interface CollectionItem {
    collectionId: number;
    collectionName: string;
    cardCount: number;
    cards: CardItem[];
}

interface CardItem {
    img: string;
    cardNumber: number;
    cardGid: number;
}

const Collections: React.FC<CollectionProps> = () => {
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

    // if (collectionData === null) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="page-content">
            <h1>All Collections</h1>
            {collectionData === null ? (
                <div className="loading">Loading...</div>
            ) : (
            <div className="collection">
                <div className="collection-left" >
                    <ul>
                        {collectionData.map((item) => (
                                <li key={item.collectionId}>
                                    <a href={`#${item.collectionId}`} >{item.collectionName}</a>
                                </li>
                        ))}
                    </ul>
                </div>
                <div className="collection-right">
                    {collectionData.map((item) => (
                        <div key={item.collectionId} id={`${item.collectionId}`}>
                            <div className="collection-title">
                                <span className="collection-count">{item.cardCount}</span>
                                <span className="collection-name">{item.collectionName} </span>
                            </div>
                            <div className="collection-block">
                            {
                                item.cards
                                    .filter((card) => card.img)
                                    .map((card) =>
                                    (
                                        <Card key={card.cardNumber} imageUrl={card.img} cardData={card.cardGid} />
                                    )
                                )
                            }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    );
};

export default Collections;
