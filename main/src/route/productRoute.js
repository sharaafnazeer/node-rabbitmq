"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Import Controller
var productController_1 = __importDefault(require("../controller/productController"));
var productController = new productController_1.default();
// Declare Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/:id/like', productController.likeProduct);
exports.default = router;
