import { Product } from './../entity/product';
import { Request, Response } from 'express';
import { getRepository } from "typeorm";

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
        this.productRepo = getRepository(this.model);
        const product = await this.productRepo.create(req.body);
        const result = await this.productRepo.save(product);
        return res.send(result);
    }

    getProduct = async (req: Request, res: Response) => {
        this.productRepo = getRepository(this.model);
        const product = await this.productRepo.findOne(req.params.id);
        return res.send(product);
    }

    updateProduct = async (req: Request, res: Response) => {
        this.productRepo = getRepository(this.model);
        const product = await this.productRepo.findOne(req.params.id);
        this.productRepo.merge(product, req.body);
        const result = await this.productRepo.save(product);
        return res.send(result);
    }
}

export default ProductController;