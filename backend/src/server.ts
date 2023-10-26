import express from 'express';
import collectionsRouter from './routes/collections';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/collections', collectionsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
