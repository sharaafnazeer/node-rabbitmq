const express = require('express');
import { createConnection } from 'typeorm';
import "reflect-metadata";
import rabbitmq from './util/rabbitmq';
import rootRouter from './route';
import ProductController from './controller/productController';

createConnection().then(value => {
    const app = express();
    const productController = new ProductController();
    app.use(express.json());

    rabbitmq.getInstance()
        .then(broker => {
            broker.subscribe('product_created', (msg, ack) => {                
                const product = JSON.parse(msg.content.toString());
                productController.saveProduct(product)
                ack()
            });

            broker.subscribe('product_updated', (msg, ack) => {                
                const product = JSON.parse(msg.content.toString());
                productController.updateProduct(product)
                ack()
            });

            broker.subscribe('product_deleted', (msg, ack) => {                
                const productId = JSON.parse(msg.content.toString());
                productController.deleteProduct(productId)
                ack()
            });
        })
    console.log('Listening to port: 8001');

    app.use('/api', rootRouter);
    app.get('*', (req, res) => res.status(200).send({
        message: 'Oh You want to access this URL? We are busy building it. Check back soon.',
    }));

    app.listen(8001);
});
