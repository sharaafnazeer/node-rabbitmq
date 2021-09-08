import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import rootRouter from './route';

createConnection().then(value => {
    const app = express();
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));

    app.use(express.json());
    console.log('Listening to port: 8000');


    
    app.use('/api', rootRouter);
    app.get('*', (req, res) => res.status(200).send({
        message: 'Oh You want to access this URL? We are busy building it. Check back soon.',
    }));
    app.listen(8000);
});
