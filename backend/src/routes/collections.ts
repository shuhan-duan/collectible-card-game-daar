import express, {Request, Response, Router} from 'express';
import * as main from "../contract";
import { PromiseOrValue } from '$/common';

const collectionsRouter: Router = express.Router();

async function createCollection(collectionName: string, cardCount: number) {
    // Create a collection with 5 cards
    // const collectionName = 'MyCollection';
    // const cardCount = 5;
    const contract = await main.init()
    await contract.createCollection(collectionName, cardCount);
}

async function addToCollection(collectionId: number) {
    // Create a collection with 5 cards
    // const collectionName = 'MyCollection';
    // const cardCount = 5;
    const contract = await main.init()

    // await contract.mintCardToCollection(1, contract.owner(), "https://i.ibb.co/V943b27/ST02-001.jpg");


}

async function getAllCollections() {

    const contract = await main.init()
    // Now you can use the contract_ object for interactions.
    const collection = await contract.getCollectionsAndCards(true, contract.owner())
    return collection.map((collection: any) => {
        return {
            collectionId: collection[0].toNumber(),
            collectionName: collection[1],
            cardCount: collection[2].toNumber(),
            cards: collection[3].map((card: any) => {
                return {
                    img: card[0],
                    cardNumber: card[1].toNumber(),
                    cardGid: card[2].toNumber(),
                    cardOwner: card[3]
                };
            }),
        };
    })
}

async function getUserCollections(user: string) {

    const contract = await main.init()
    // Now you can use the contract_ object for interactions.
    const collection = await contract.getCollectionsAndCards(false, user)
    return collection.map((collection: any) => {
        return {
            collectionId: collection[0].toNumber(),
            collectionName: collection[1],
            cardCount: collection[2].toNumber(),
            cards: collection[3].map((card: any) => {
                return {
                    img: card[0],
                    cardNumber: card[1].toNumber(),
                    cardGid: card[2].toNumber(),
                    cardOwner: card[3]
                };
            }),
        };
    })
}

collectionsRouter.get('/get', async (req: Request, res: Response) => {
    try {
        const mes = await getAllCollections();
        res.json(mes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

collectionsRouter.get('/getFor/:address', async (req: Request, res: Response) => {
    const user = req.params.address;
    try {
        const mes = await getUserCollections(user);
        res.json(mes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

collectionsRouter.get('/create', async (req: Request, res: Response) => {
    try {
        const mes = await createCollection("ST01", 17);
        const mes2 = await createCollection("ST02", 17);
        const mes3 = await createCollection("ST03", 17);
        const mes4 = await createCollection("ST04", 17);
        res.json({ message: mes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

collectionsRouter.get('/addTo', async (req: Request, res: Response) => {
    try {
        const mes = await addToCollection( 0);
        res.json({ message: mes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

export default collectionsRouter;
