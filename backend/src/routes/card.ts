import express, {Request, Response, Router} from 'express';
import fetch from 'node-fetch';
const apiUrl = 'https://onepiece-cardgame.dev/cards.json';
const cardRouter: Router = express.Router();


cardRouter.get('/getInfo/:gid', async (req: Request, res: Response) => {
    const targetGid = req.params.gid;
    try {
        const response = await fetch(apiUrl);
        let mes = "";
        if (response.ok) {
            const jsonData = await response.json();
            const desiredObject = jsonData.find((item: { gid: string }) => item.gid === targetGid);

            if (desiredObject) {
                // Object with the specified gid was found
                mes = desiredObject;
            }
        } else {
            console.error('Failed to fetch JSON data:', response.statusText);
        }
        res.json(mes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

export default cardRouter