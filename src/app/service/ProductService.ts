import { Context } from 'koa'
import library from '../db/entity/library'
import { Product } from '../model/Product';
import path from 'path';
import fs from 'fs';


class ProductService {
    constructor() { }
    async addProduct(ctx: Context) {
        const { file } = ctx.request;
        let filename = null;
        if (file) {
            console.log(file, __dirname, file.filename)
            const filePath = path.join('C:\\Users\\DELL\\Desktop\\Project\\ordering_app\\koa_application', 'uploads', file.filename);
            // Save the file to the server
            const reader = fs.createReadStream(file.path);
            const writer = fs.createWriteStream(filePath);
            reader.pipe(writer);
            filename = file.filename;
        }
        let productData = {
            name: ctx.request.body.name,
            description: ctx.request.body.description,
            price: ctx.request.body.price,
            product_unit: ctx.request.body.product_unit || 'unit',
            image_url: filename
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
            product.setProductUnit(productModel.product_unit);
            product.setImageUrl(productModel.image_url);
            if(product.product_unit)
                product.product_unit =product.product_unit.charAt(0).toUpperCase() + product.product_unit.slice(1);        
            console.log(product)
            products.push(product);
            ;
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
            product.setPrice(productModel.price);
            product.setProductUnit(productModel.product_unit);
            product.setImageUrl(productModel.image_url);
        }
        if (product.product_unit)
            product.product_unit = product.product_unit.charAt(0).toUpperCase() + product.product_unit.slice(1);
        return product
    }
}

let productService: ProductService = new ProductService()
export default productService