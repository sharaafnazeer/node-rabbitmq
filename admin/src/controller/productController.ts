import { Product } from './../entity/product';
import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import rabbitmq from '../util/rabbitmq';

class ProductController {
    productRepo: any = null;
    model: any = null;

    constructor() {
        this.model = Product;
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts = async (req: Request, res: Response) => {
        this.productRepo = getRepository(this.model);
        const products = await this.productRepo.find();
        return res.send(products);
    }

    saveProduct = async (req: Request, res: Response) => {
        try {
            this.productRepo = getRepository(this.model);
            const product = await this.productRepo.create(req.body);
            const result = await this.productRepo.save(product);
            const broker = await rabbitmq.getInstance();
            await broker.send('product_created', Buffer.from(JSON.stringify(result)));
            return res.send(result);
        } catch (ex) {
            console.log(ex)
        }
    }

    getProduct = async (req: Request, res: Response) => {
        this.productRepo = getRepository(this.model);
        const product = await this.productRepo.findOne(req.params.id);
        return res.send(product);
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            this.productRepo = getRepository(this.model);
            const product = await this.productRepo.findOne(req.params.id);
            this.productRepo.merge(product, req.body);
            const result = await this.productRepo.save(product);
            const broker = await rabbitmq.getInstance();
            await broker.send('product_updated', Buffer.from(JSON.stringify(result)));
            return res.send(result);
        } catch (ex) {
            console.log(ex)
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            this.productRepo = getRepository(this.model);
            const result = await this.productRepo.delete(req.params.id);
            const broker = await rabbitmq.getInstance();
            await broker.send('product_deleted', Buffer.from(JSON.stringify(req.params.id)));
            return res.send(result);
        } catch (ex) {
            console.log(ex)
        }
    }

    likeProduct = async (eventProductId) => {
        try {
            this.productRepo = getRepository(this.model);
            const product = await this.productRepo.findOne(eventProductId);
            product.likes++
            const result = await this.productRepo.save(product);
            return result;
        } catch (ex) {
            console.log(ex)
        }
    }
}

export default ProductController;