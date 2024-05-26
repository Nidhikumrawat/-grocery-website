import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import productService from '../service/ProductService'
import cartService from '../service/CartService'
import userService from '../service/UserService'
import { Cart } from '../model/Cart'
import { User } from '../model/User'
import { Product } from '../model/Product'
import apiErrorHandler from '../utils/ApiErrorHandler'

class CartController {
    constructor() { }

    async addToCart(ctx: Context) {
        try {
            await cartService.addOrderToCart(ctx)
            ctx.status = httpConstants.HTTP_SUCCESS_OK
            await ctx.redirect('cart')
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addToCart, Error : ${JSON.stringify(error)}`)
        }
    }

    async removeCartItem(ctx: Context) {
        try {
            await cartService.deleteItemFromCart(ctx)
            await ctx.redirect('cart')
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : removecartitems, Error : ${JSON.stringify(error)}`)
        }
    }

    async emptyCart(ctx: Context) {
        try {
            let userEmail = ctx.cookies.get("user-detail");
            let user: User = await userService.getUsers(userEmail)
            await cartService.deleteFromCart(user.id)
            await ctx.redirect('cart')
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : emptycart, Error : ${JSON.stringify(error)}`)
        }
    }

    async getAllCartItems(ctx: Context) {
        try {
            let userEmail = ctx.cookies.get("user-detail");
            let userCartData:any[] = [];
            let user: User = await userService.getUsers(userEmail)
            let userId = user.id;
            let userCartItems: Array<Cart> = await cartService.getCartItemByUserId(userId);
            let totalOrderAmount = 0;
            for (let i = 0; i < userCartItems.length; i++) {
                let productId = userCartItems[i].product_id;
                let product: Product = await productService.getProductByProductId(productId)
                let cartDetails={
                    cart: userCartItems[i],
                    product:product
                }
                totalOrderAmount += Number(userCartItems[i].quantity * product.price);
                userCartData.push(cartDetails)
            }
            totalOrderAmount = Number(totalOrderAmount.toFixed(2));
            await ctx.render('cart', { usercartitems: userCartData,  count: userCartData.length,totalOrderAmount });
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllCartItem, Error : ${JSON.stringify(error)}`)
        }
    }
}

const cartController: CartController = new CartController()
export default cartController