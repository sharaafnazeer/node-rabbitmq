"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productRoute_1 = require("./productRoute");
var rootRouter = (0, express_1.Router)();
rootRouter.use('/product', productRoute_1.default);
exports.default = rootRouter;
