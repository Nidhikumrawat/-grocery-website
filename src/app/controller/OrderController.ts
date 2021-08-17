import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import orderService from '../service/OrderService'
import productService from '../service/ProductService'
import { Product } from '../model/Product'
import { Cart } from '../model/Cart'
import { OrderDetail } from '../model/OrderDetail'
import apiErrorHandler from '../utils/ApiErrorHandler'
import cartService from '../service/CartService'
import orderDetailsService from "../service/OrderDetailsService";
import userService from '../service/UserService'
import { User } from '../model/User'
const orderid = require('order-id')('mysecret');



class OrderController {
    constructor() { }

    async addOrder(ctx: Context) {
        try {
            let cartid: string = ctx.request.body.cartids;
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let carts = [];
                const cartids = cartid.split(",");
                for (let i = 0; i < cartids.length; i++) {
                    carts.push(Number(cartids[i]))
                }
                let cartitems: Array<Cart> = await cartService.getCartItemById(carts)
                let user: User = await userService.getUser(useremail)
                for (let i = 0; i < cartitems.length; i++) {
                    let item = cartitems[i];
                    const uniqueorderid: string = orderid.generate();
                    let productid: number = item.productid;
                    let cartid: number = item.id;
                    let product: Product = await productService.getProductByProductId(productid)

                    interface orderstypes {
                        email: string;
                        productid: number;
                        orderid: string;
                    }
                    let orderDetail: orderstypes = {
                        email: useremail,
                        productid: productid,
                        orderid: uniqueorderid
                    }
                    interface orderdetailstypes {
                        orderid: string;
                        name: string;
                        email: string;
                        phoneno: number;
                        address: string;
                        productname: string;
                        description: string;
                        totalprice: number;
                        price: number;
                        quantity: number;
                    }
                    let orderDetails: orderdetailstypes = {
                        orderid: uniqueorderid,
                        name: user.name,
                        email: useremail,
                        phoneno: user.phoneno,
                        address: user.address,
                        productname: product.name,
                        description: product.description,
                        totalprice: item.totalprice,
                        price: product.price,
                        quantity: (item.totalprice) / (product.price)
                    }
                    await orderService.addOrder(orderDetail)
                    await orderDetailsService.addOrderDetails(orderDetails)
                    await cartService.deleteItemFromCartById(cartid)
                }
                ctx.status = httpConstants.HTTP_CREATED
                await ctx.render('placedorder')
            }
        }
        catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addOrder, Error : ${JSON.stringify(error)}`)
        }
    }

    async getAllOrderForUser(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let orders: Array<OrderDetail> = await orderDetailsService.getAllOrders(ctx)
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.render('myorders', { allorders: orders });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllOrderForUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async updateOrderStatus(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail == "null")) {
                await ctx.render('login')
            } else {
                let orderid: number = ctx.request.body.orderid;
                let orderDetails: OrderDetail = await orderDetailsService.getOrderById(orderid)
                interface orderdetailstypes {
                    name: string;
                    email: string;
                    phoneno: number;
                    address: string;
                    productname: string;
                    description: string;
                    totalprice: number;
                    orderid: string;
                    status: string;
                    price: number;
                    quantity: number;
                    createdAt: Date;
                }
                let updateStatus: orderdetailstypes = {
                    name: orderDetails.name,
                    email: orderDetails.email,
                    phoneno: orderDetails.phoneno,
                    address: orderDetails.address,
                    productname: orderDetails.productname,
                    description: orderDetails.description,
                    totalprice: orderDetails.totalprice,
                    orderid: orderDetails.orderid,
                    status: ctx.request.body.status,
                    price: orderDetails.price,
                    quantity: orderDetails.quantity,
                    createdAt: orderDetails.createdAt
                }
                let updatedCount = await orderDetailsService.updateOrderStatus(updateStatus, orderDetails.id)
                if (!updatedCount) {
                    ctx.status = httpConstants.HTTP_CONFLICT
                    ctx.body = { error: 'data does not exist.' }
                } else {
                    ctx.status = httpConstants.HTTP_SUCCESS_OK
                    await ctx.render('adminpage')
                }
            }
        } catch (error) {

        }
    }

    async veiwOrderDetails(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail == "null")) {
                await ctx.render('login')
            } else {
                let orderid: number = ctx.request.body.orderid;
                let orderDetails: OrderDetail = await orderDetailsService.getOrderById(orderid)
                await ctx.render('adminorderdetails', { orderDetails: orderDetails })
            }
        } catch (error) {

        }
    }

    async viewUserOrderDetail(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail == "null")) {
                await ctx.render('login')
            } else {
                let orderid = ctx.request.body.orderid;
                let orderDetails: OrderDetail = await orderDetailsService.getOrderById(orderid)
                console.log(orderDetails);
                await ctx.render('userordersDetail', { orderDetails: orderDetails })
            }
        } catch (error) {

        }
    }

}

const orderController: OrderController = new OrderController()
export default orderController

