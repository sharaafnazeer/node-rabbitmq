import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import "reflect-metadata";

createConnection().then(value => {
    const app = express();
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));

    app.use(express.json());
    console.log('Listening to port: 8000');
    app.listen(8000);
});
