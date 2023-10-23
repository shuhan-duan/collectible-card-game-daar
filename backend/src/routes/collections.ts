import express, {Request, Response, Router} from 'express';
import {ethers} from "ethers";
import {contracts} from '../contracts.json'
import type { Main } from '$/src/Main'

const collectionsRouter: Router = express.Router();

const connect = async () => {

    const jsonRpcUrl = 'http://127.0.0.1:8545';
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const { address, abi } = contracts.Main
    const contract = new ethers.Contract(address, abi, provider)
    const deployed = await contract.deployed()
    if (!deployed) console.log("contract not deployed")
    const contract_= signer ? contract.connect(signer) : contract
    return contract_ as any as Main
    // Create a collection with 5 cards
    // const collectionName = 'MyCollection';
    // const cardCount = 5;
    // await contract.createCollection(collectionName, cardCount);

    // Add one more card to the collection
    // const collectionId = 0; // Assuming this is the ID of the created collection
    // const imgUrl = 'https://onepiece-cardgame.dev/images/cards/OP01-001_332dbe_jp.jpg';
    // await contract.mintCardToCollection(collectionId, imgUrl);

};

async function main() {
    const contract_ = await connect();
    // Now you can use the contract_ object for interactions.
    const collection = await contract_.getAllCollectionsAndCards()
    console.log(collection)
}

collectionsRouter.get('/', (req: Request, res: Response) => {
    main().then(r => console.log("here"))

    res.json({ message: 'This is the collections route' });
});

export default collectionsRouter;
