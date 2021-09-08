"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var route_1 = require("./route");
(0, typeorm_1.createConnection)().then(function (value) {
    var app = express();
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));
    app.use(express.json());
    console.log('Listening to port: 8000');
    app.use('/api', route_1.default);
    app.get('*', function (req, res) { return res.status(200).send({
        message: 'Oh You want to access this URL? We are busy building it. Check back soon.',
    }); });
    app.listen(8000);
});
