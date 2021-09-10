import Product from './../entity/product';
import { Request, Response } from 'express';
import { getMongoRepository } from "typeorm";
import rabbitmq from '../util/rabbitmq';

class ProductController {
    productRepo: any = null;
    model: any = null;

    constructor() {
        this.model = Product;
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            this.productRepo = getMongoRepository(this.model);
            const products = await this.productRepo.find();
            return res.send(products);
        } catch (ex) {
            console.error(ex)
        }
    }

    saveProduct = async (eventProduct) => {
        try {
            const product = new Product()
            product.mainId = parseInt(eventProduct.id.toString())
            product.title = eventProduct.title
            product.image = eventProduct.image
            product.likes = eventProduct.likes
            this.productRepo = getMongoRepository(this.model);
            const result = await this.productRepo.save(product);
            return result;
        } catch (ex) {
            console.error(ex)
        }

    }

    getProduct = async (req: Request, res: Response) => {
        this.productRepo = getMongoRepository(this.model);
        const product = await this.productRepo.findOne(req.params.id);
        return res.send(product);
    }

    updateProduct = async (eventProduct) => {
        try {
            this.productRepo = getMongoRepository(this.model);
            const product = await this.productRepo.findOne({ mainId: parseInt(eventProduct.id) })
            this.productRepo.merge(product, {
                title: eventProduct.title,
                image: eventProduct.image,
                likes: eventProduct.likes
            });
            const result = await this.productRepo.save(product);
            return result;
        } catch (ex) {
            console.error(ex)
        }
    }

    deleteProduct = async (eventProductId) => {
        try {
            this.productRepo = getMongoRepository(this.model);
            console.log(eventProductId)
            const result = await this.productRepo.deleteOne({ 'mainId': parseInt(eventProductId) });
            return result;
        } catch (ex) {
            console.error(ex)
        }
    }

    likeProduct = async (req: Request, res: Response) => {
        try {
            this.productRepo = getMongoRepository(this.model);
            const product = await this.productRepo.findOne(req.params.id);
            product.likes++
            const result = await this.productRepo.save(product);
            const broker = await rabbitmq.getInstance();
            await broker.send('product_liked', Buffer.from(JSON.stringify(product.mainId)));
            return res.send(result);
        } catch (ex) {
            console.error(ex)
        }

    }
}

export default ProductController;