import { Context } from 'koa'
import { Sequelize } from "sequelize";
const { Op } = require("sequelize");
import library from '../db/entity/library'
import { Product } from '../model/Product';


class ProductService {
    constructor() { }
    async addProduct(ctx: Context) {
        let name: string = ctx.request.body.name
        let description: string = ctx.request.body.description
        let price: number = ctx.request.body.price
        await library.Product.create({
            name: name,
            description: description,
            price: price,
        })
    }

    async getProductByProductId(productId): Promise<Product> {
        let productModel = await library.Product.findByPk(productId)
        let product: Product = new Product()
        if (productModel) {
            product.setId(productModel.id)
            product.setName(productModel.name)
            product.setDescription(productModel.description)
            product.setPrice(productModel.price)
        }
        return product
    }

    async getAllProducts(ctx: Context): Promise<Array<Product>> {
        let productModels = await library.Product.findAll()

        let products: Array<Product> = new Array<Product>()
        for (let productModel of productModels) {
            let product: Product = new Product()
            product.setId(productModel.id)
            product.setName(productModel.name)
            product.setDescription(productModel.description)
            product.setPrice(productModel.price)
            products.push(product)
        }
        return products
    }
}


let productService: ProductService = new ProductService()
export default productService