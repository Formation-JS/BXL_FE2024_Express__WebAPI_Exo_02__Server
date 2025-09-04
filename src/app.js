import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routers/index.js";
import { authentificationMiddleware } from "./middlewares/auth.middleware.js";
import cors from 'cors';


const { NODE_ENV, PORT } = process.env;

const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.use(authentificationMiddleware());
app.use(express.json());

app.use('/public',express.static('public'));

app.use('/api', apiRouter);






app.listen(PORT, (error) => {

    if (error) {
        console.log('Web API on error ! \n');
        console.log(error);
        return;
    }

    console.log(`Web API is running on port ${PORT} [ENV: ${NODE_ENV}]`);
});