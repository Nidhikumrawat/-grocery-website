import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import productService from '../service/ProductService'
import apiErrorHandler from '../utils/ApiErrorHandler'
import { Product } from '../model/Product'



class ProductController {
    constructor() { }

    async addProduct(ctx: Context) {
        let useremail: string = ctx.cookies.get("user-detail");
        if ((useremail === undefined) || (useremail === null)) {
            await ctx.render('login')
        } else {
            await ctx.render('addproduct');
        }
    }

    async getAllProducts(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let products: Array<Product> = await productService.getAllProducts(ctx)
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                if (useremail == "patilpallavi059@gmail.com") {
                    await ctx.render('productpage', { productdata: products });
                } else {
                    await ctx.render('userproductpage', { productdata: products });
                }
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllProducts, Error : ${JSON.stringify(error)}`)
        }
    }

    async getAllProductsForAdmin(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail == "null")) {
                await ctx.render('login')
            } else {
                let products: Array<Product> = await productService.getAllProducts(ctx)
                await ctx.render('productpage', { productdata: products });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllProductsForAdmin, Error : ${JSON.stringify(error)}`)
        }
    }

    async addProducts(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail == "null")) {
                await ctx.render('login')
            } else {
                logger.info(`Controller : addproduct, Request-Body : ${JSON.stringify(ctx.params)}`)
                await productService.addProduct(ctx)
                ctx.status = httpConstants.HTTP_CREATED;
                await ctx.render('adminpage');
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addProduct, Error : ${JSON.stringify(error)}`)
        }
    }

}

const productController: ProductController = new ProductController()
export default productController
