"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
require("reflect-metadata");
(0, typeorm_1.createConnection)().then(function (value) {
    var app = express();
    app.use(express.json());
    app.listen(8001);
});
