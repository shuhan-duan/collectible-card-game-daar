// Collections.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Collections.css'

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
    {console.log(collectionData)}
    return (
        <div>
            <header className="page-header" >
                <div className="header-content">
                    {/*<h1>Your Page Title</h1>*/}
                    {/*<p>Your page subtitle or description</p>*/}
                </div>
            </header>
            <h2>Collections</h2>
            <ul>
                {collectionData.map((item) => (
                    <li key={item.collectionId}>
                        <div>{item.collectionName}</div>
                        <ul>
                            {item.cards.map( (card) => (
                                <img src={card.img} alt=""/>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Collections;
