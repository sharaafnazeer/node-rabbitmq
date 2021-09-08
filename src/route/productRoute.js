"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Import Controllers
var productController_1 = require("../controller/productController");
var productController = new productController_1.default();
// Declare Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.saveProduct);
router.put('/:id', productController.updateProduct);
exports.default = router;
