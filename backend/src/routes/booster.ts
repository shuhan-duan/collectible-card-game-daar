import express, {Request, Response, Router} from 'express';
import * as main from "../contract";
import { PromiseOrValue } from '$/common';
import collections from "@/routes/collections";

const boostersRouter: Router = express.Router();

// async function createBooster(user: string) {
//     // Create a collection with 5 cards
//     // const collectionName = 'MyCollection';
//     // const cardCount = 5;
//     const contract = await main.init()
//     const res = await contract.createBooster();
//
//     return res
// }

const img = [
    {img: "https://i.ibb.co/V943b27/ST02-001.jpg", gid: 49},
    {img: "https://i.ibb.co/b2mgK7q/ST01-001.jpg", gid: 1},
    {img: "https://i.ibb.co/4Ft6d70/ST02-002.webp", gid: 109},
    {img: "https://i.ibb.co/fnkqCnH/ST01-002.jpg", gid: 23},
    {img: "https://i.ibb.co/wwqq7h6/ST01-017.jpg", gid: 18}
]

function getBoosterCards() {
// Create a copy of the original array to avoid modifying it
    const copyArr = [...img];

    // Use a Fisher-Yates shuffle to randomize the array
    for (let i = copyArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }

    return copyArr.slice(0, 5);
}
// async function redeemBooster(user: string) {
//     // Create a collection with 5 cards
//     // const collectionName = 'MyCollection';
//     // const cardCount = 5;
//     const contract = await main.init()
//     const res = await contract.redeemBooster(user, 0, img);
//
//     return res
// }

async function getBoosters(user: string) {

    const contract = await main.init()
    // Now you can use the contract_ object for interactions.
    const boosters = await contract.getCollectionsAndCards(false, true, user)
    return boosters.filter((collection) => collection.owner === user)
        .map((collection: any) => {
        return {
            boosterId: collection[0].toNumber(),
            boosterName: collection[1] + "-"+collection[0].toNumber(),
            boosterCardCount: collection[2],
            cards: collection[3].map((card: any) => {
                return {
                    img: card[0],
                    cardNumber: card[1].toNumber(),
                    cardGid: card[2].toNumber(),
                    onSell: card[3],
                    cardOwner: card[4]
                };
            }),
            redeemed: collection[4],
            owner: collection[5]
        };
    })
}


boostersRouter.get('/get/:address', async (req: Request, res: Response) => {
    const user = req.params.address;
    try {
        const mes = await getBoosters(user);
        res.json(mes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// boostersRouter.get('/create/:address', async (req: Request, res: Response) => {
//     const user = req.params.address;
//     try {
//         const mes = await createBooster(user);
//
//         res.json({ message: mes });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

boostersRouter.get('/redeem', (req: Request, res: Response) => {

    try {
        const mes = getBoosterCards();

        res.json(mes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

export default boostersRouter;
