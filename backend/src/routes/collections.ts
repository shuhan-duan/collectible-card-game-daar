import express, {Request, Response, Router} from 'express';
import * as main from "../contract";

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

    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/b2mgK7q/ST01-001.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/fnkqCnH/ST01-002.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/HBKbCDF/ST01-003.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/85vGsbt/ST01-004.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/ypVk4wY/ST01-005.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/hM8HFcm/ST01-006.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/mFnR6P2/ST01-007.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/JjKdX4Q/ST01-008.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/BzV4j25/ST01-009.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/Fxr76Dp/ST01-010.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/VxfCYxT/ST01-011.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/k5QrSb2/ST01-012.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/ctRx7BY/ST01-013.webp");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/Zdv8M9b/ST01-014.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/fScydcV/ST01-015.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/D1VJWqR/ST01-016.jpg");
    await contract.mintCardToCollection(collectionId, "https://i.ibb.co/wwqq7h6/ST01-017.jpg");


}

async function getCollections() {

    const contract = await main.init()
    //
    // // Add one more card to the collection
    // const collectionId = 0; // Assuming this is the ID of the created collection
    // const imgUrl = 'https://onepiece-cardgame.dev/images/cards/OP01-001_332dbe_jp.jpg';
    // await contract.mintCardToCollection(collectionId, imgUrl);

    // Now you can use the contract_ object for interactions.
    const collection = await contract.getAllCollectionsAndCards()
    return collection.map((collection: any) => {
        return {
            collectionName: collection[0],
            cardCount: collection[1].toNumber(),
            cards: collection[2].map((card: any) => {
                return {
                    img: card[0],
                    cardNumber: card[1].toNumber(),
                };
            }),
        };
    })
}

collectionsRouter.get('/get', async (req: Request, res: Response) => {
    try {
        const mes = await getCollections();
        res.json({ message: mes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

collectionsRouter.get('/create', async (req: Request, res: Response) => {
    try {
        const mes = await createCollection("ST01", 17);
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
