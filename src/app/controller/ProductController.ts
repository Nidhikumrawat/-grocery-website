import { Context } from 'koa'
import { Product } from '../model/Product'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import productService from '../service/ProductService'
import apiErrorHandler from '../utils/ApiErrorHandler'
import userValidation from '../validation/custom/Validation'

class ProductController {
    constructor() { }

    async addProduct(ctx: Context) {
        await ctx.render('addproduct', { message: "" });
    }

    async getAllProducts(ctx: Context) {
        try {
            let userEmail: string = ctx.cookies.get("user-detail");
            let products: Array<Product> = await productService.getAllProducts(ctx);
            ctx.status = httpConstants.HTTP_SUCCESS_OK
            if (userEmail == process.env.ADMIN_EMAIL) {
                await ctx.render('productpage', { productdata: products });
            } else {
                await ctx.render('userproductpage', { productdata: products });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllProducts, Error : ${JSON.stringify(error)}`)
        }
    }


    async addProducts(ctx: Context) {
        try {
            let validation = await userValidation.addProduct(ctx)
            if (!validation) {
                await ctx.render('addproduct', { message: "Invalid Product Details Format" });
            } else {
                logger.info(`Controller : addProduct, Request-Body : ${JSON.stringify(ctx.params)}`)
                await productService.addProduct(ctx)
                ctx.status = httpConstants.HTTP_CREATED;
                await ctx.render('addproduct', { message: "Product Added Successfully" });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addProduct, Error : ${JSON.stringify(error)}`)
            await ctx.render('addproduct', { message: "Enter Correct Details" });
        }
    }
}
const productController: ProductController = new ProductController()
export default productController