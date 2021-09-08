import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import rootRouter from './route';

createConnection().then(value => {
    const app = express();

    app.use(express.json());
    
    

    
    app.listen(8001);
});
