import express from 'express';
import dotenv from 'dotenv';
import router from './routes/studentRoute';
import connectDB from './config/db';

dotenv.config();

connectDB();

const app = express();
const Port=process.env.PORT || 5000;

app.use(express.json());

app.use('/',router);

app.listen(Port, () => console.log(`Running on ${Port}`));
