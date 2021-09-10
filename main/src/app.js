"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var rabbitmq_1 = __importDefault(require("./util/rabbitmq"));
var route_1 = __importDefault(require("./route"));
var productController_1 = __importDefault(require("./controller/productController"));
(0, typeorm_1.createConnection)().then(function (value) {
    var app = express();
    var productController = new productController_1.default();
    app.use(express.json());
    rabbitmq_1.default.getInstance()
        .then(function (broker) {
        broker.subscribe('product_created', function (msg, ack) {
            var product = JSON.parse(msg.content.toString());
            productController.saveProduct(product);
            ack();
        });
        broker.subscribe('product_updated', function (msg, ack) {
            var product = JSON.parse(msg.content.toString());
            productController.updateProduct(product);
            ack();
        });
        broker.subscribe('product_deleted', function (msg, ack) {
            var productId = JSON.parse(msg.content.toString());
            productController.deleteProduct(productId);
            ack();
        });
    });
    console.log('Listening to port: 8001');
    app.use('/api', route_1.default);
    app.get('*', function (req, res) { return res.status(200).send({
        message: 'Oh You want to access this URL? We are busy building it. Check back soon.',
    }); });
    app.listen(8001);
});
