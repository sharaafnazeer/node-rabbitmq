import { Router } from 'express';
let router = Router();

// Import Controller
import ProductController from '../controller/productController';
const productController = new ProductController();

// Declare Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/:id/like', productController.likeProduct);

export default router;