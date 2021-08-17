import { Context } from 'koa'
import library from '../db/entity/library'
import { Product } from '../model/Product';

class ProductService {
    constructor() { }
    async addProduct(ctx: Context) {
        let productData = {
             name:  ctx.request.body.name,
             description: ctx.request.body.description,
             price: ctx.request.body.price
        }
        await library.Product.create(productData)
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
}

let productService: ProductService = new ProductService()
export default productService