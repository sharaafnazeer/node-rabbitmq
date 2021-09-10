const express = require('express');
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import rootRouter from './route';
import rabbitmq from './util/rabbitmq';
import ProductController from './controller/productController';

createConnection().then(value => {
    const app = express();
    const productController = new ProductController();
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));

    app.use(express.json());

    rabbitmq.getInstance()
        .then(broker => {
            broker.subscribe('product_liked', async (msg, ack) => {
                const productId = JSON.parse(msg.content.toString());
                productController.likeProduct(productId);
                ack()
            });
        });

    console.log('Listening to port: 8000');

    app.use('/api', rootRouter);
    app.get('*', (req, res) => res.status(200).send({
        message: 'Oh You want to access this URL? We are busy building it. Check back soon.',
    }));
    app.listen(8000);
});
