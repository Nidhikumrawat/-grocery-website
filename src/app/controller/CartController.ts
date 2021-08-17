import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import productService from '../service/ProductService'
import cartService from '../service/CartService'
import orderDetailsService from "../service/OrderDetailsService";
import { Cart } from '../model/Cart'
import { OrderDetail } from "../model/OrderDetail";
import apiErrorHandler from '../utils/ApiErrorHandler'
import { Product } from '../model/Product'

class CartController {
    constructor() { }

    async addToCart(ctx: Context) {
        try {
            let useremail = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let quantity = ctx.request.body.quantity;
                let useremail = ctx.cookies.get("user-detail");
                let productId = parseInt(ctx.request.body.productid)
                let product: Product = await productService.getProductByProductId(productId)
                let totalprice = (product.price) * quantity;

                interface cartFieldtypes {
                    email: string;
                    productid: number;
                    totalprice: number;
                }
                let cart: cartFieldtypes = {
                    email: useremail,
                    productid: ctx.request.body.productid,
                    totalprice: totalprice
                }
                await cartService.addOrderToCart(cart)
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.render('users')
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addToCart, Error : ${JSON.stringify(error)}`)
        }
    }

    async getAllCartItems(ctx: Context) {
        try {
            let useremail = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let orderDetails = {}
                let cartids: Array<number> = [];
                let usercartitems = [];
                let useremail = ctx.cookies.get("user-detail");
                let cartitems: Array<Cart> = await cartService.getCartItemByUserId(useremail)

                for (let i = 0; i < cartitems.length; i++) {
                    let item = cartitems[i];
                    let totalprice = item.totalprice;
                    let productid = item.productid;
                    cartids.push(Number(item.id))
                    let product: Product = await productService.getProductByProductId(productid)

                    orderDetails = {
                        cartid: item.id,
                        email: item.email,
                        productname: product.name,
                        description: product.description,
                        quantity: totalprice / (product.price),
                        totalprice: totalprice
                    }
                    usercartitems.push(orderDetails)
                }
                await ctx.render('cart', { usercartitems: usercartitems, cartids: cartids });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllCartItem, Error : ${JSON.stringify(error)}`)
        }
    }

    async orderListForAdmin(ctx: Context) {
        try {
            let useremail = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let orderdetail: Array<OrderDetail> = await orderDetailsService.getAllOrdersForAdmin(ctx)
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.render('veiwusersorder', { title: 'display', orderdetails: orderdetail });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllOrdersDetail, Error : ${JSON.stringify(error)}`)
        }
    }

    async emptyCart(ctx: Context) {
        try {
            let useremail = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let cartid = ctx.request.body.cartid;
                let carts = [];
                const cartids = cartid.split(",");
                for (let i = 0; i < cartids.length; i++) {
                    carts.push(Number(cartids[i]))
                }
                console.log("deleted", carts);
                await cartService.deleteFromCart(carts)
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.render('users')
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : emptycart, Error : ${JSON.stringify(error)}`)
        }
    }
    
    async removeCartItem(ctx: Context) {
        try {
            let useremail = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let cartid = ctx.request.body.cartid;
                await cartService.deleteItemFromCartById(cartid)
                let orderDetails = {}
                let cartids = [];
                let usercartitems = [];
                let useremail = ctx.cookies.get("user-detail");
                let cartitems: Array<Cart> = await cartService.getCartItemByUserId(useremail)

                for (let i = 0; i < cartitems.length; i++) {
                    let item = cartitems[i];
                    let totalprice = item.totalprice;
                    let productid = item.productid;
                    cartids.push(Number(item.id))
                    let product: Product = await productService.getProductByProductId(productid)

                    orderDetails = {
                        cartid: item.id,
                        email: item.email,
                        productname: product.name,
                        description: product.description,
                        quantity: totalprice / (product.price),
                        totalprice: totalprice
                    }
                    usercartitems.push(orderDetails)
                }
                await ctx.render('cart', { usercartitems: usercartitems, cartids: cartids });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : removecartitems, Error : ${JSON.stringify(error)}`)
        }
    }
}

const cartController: CartController = new CartController()
export default cartController

