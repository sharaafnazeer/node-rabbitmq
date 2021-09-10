import { Router } from 'express';
let router = Router();

// Import Controller
import ProductController from '../controller/productController';
const productController = new ProductController();

// Declare Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.saveProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;