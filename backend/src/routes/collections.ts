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


    await contract.mintCardToCollection(1, "https://i.ibb.co/V943b27/ST02-001.jpg");
    await contract.mintCardToCollection(1, "https://i.ibb.co/4Ft6d70/ST02-002.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/1szLTmw/ST02-003.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/tMXDcR5/ST02-004.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/9tpf6yS/ST02-005.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/cNjDBvC/ST02-006.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/ZRQgT9S/ST02-007.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/KVnHHjz/ST02-008.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/hMYt0bc/ST02-009.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/s1kRXYv/ST02-010.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/GJkRbhT/ST02-011.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/1KjYj3w/ST02-012.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/hXSYtgR/ST02-013.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/Kw01V37/ST02-014.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/Lgx14f2/ST02-015.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/tDnzKGs/ST02-016.webp");
    await contract.mintCardToCollection(1, "https://i.ibb.co/N7DdvGf/ST02-017.webp");

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
            collectionId: collection[0].toNumber(),
            collectionName: collection[1],
            cardCount: collection[2].toNumber(),
            cards: collection[3].map((card: any) => {
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
