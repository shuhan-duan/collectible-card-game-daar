import express from 'express';
import collectionsRouter from './routes/collections';
import cors from 'cors';
import cardRouter from "./routes/card";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/collections', collectionsRouter);
app.use('/api/cards', cardRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
