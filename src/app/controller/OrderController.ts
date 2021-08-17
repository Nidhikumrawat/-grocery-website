import { Context } from 'koa'
import { User } from '../model/User'
import { Order } from '../model/Order'
import { Cart } from '../model/Cart'
import { OrderDetail } from '../model/OrderDetail'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import userService from '../service/UserService'
import orderService from '../service/OrderService'
import cartService from '../service/CartService'
import apiErrorHandler from '../utils/ApiErrorHandler'
import orderDetailsService from "../service/OrderDetailsService";
const orderid = require('order-id')('mysecret');

class OrderController {
    constructor() { }

    async getAllOrderForUser(ctx: Context) {
        try {
            let userEmail: string = ctx.cookies.get("user-detail");
            let user: User = await userService.getUsers(userEmail)
            let userId = user.id
            let userorderitems: Array<Order> = await orderService.getUserOrders(userId)
            ctx.status = httpConstants.HTTP_SUCCESS_OK
            await ctx.render('myorders', { userorderitems: userorderitems });
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllOrderForUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async orderListForAdmin(ctx: Context) {
        try {
            let orderDetails: Array<Order> = await orderService.getOrders(ctx)
            ctx.status = httpConstants.HTTP_SUCCESS_OK
            await ctx.render('veiwusersorder', { title: 'display', orderdetails: orderDetails });
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllOrdersDetail, Error : ${JSON.stringify(error)}`)
        }
    }


    async updateOrderStatus(ctx: Context) {
        try {
            let updatedCount = await orderService.updateOrderStatus(ctx)
            if (!updatedCount) {
                ctx.status = httpConstants.HTTP_CONFLICT
                ctx.body = { error: 'data does not exist.' }
            } else {
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.redirect('orderlist')
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : updateOrderStatus, Error : ${JSON.stringify(error)}`)
        }
    }

    async veiwOrderDetails(ctx: Context) {
        try {
            let { orderId, id } = ctx.request.body
            let order: Order = await orderService.getOrder(id)
            let userId = order.user_id;
            let user: User = await userService.getUserById(userId)
            let orderDetails: Array<OrderDetail> = await orderDetailsService.getUserOrdersDetails(orderId)
            await ctx.render('adminorderdetails', { orderDetails: orderDetails, userDetails: user, orderId: orderId, order: order })
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : veiwOrderDetails, Error : ${JSON.stringify(error)}`)
        }
    }

    async viewUserOrderDetail(ctx: Context) {
        try {
            let { orderId, id } = ctx.request.body
            let order: Order = await orderService.getOrder(id)
            let userId = order.user_id;
            let user: User = await userService.getUserById(userId)
            let orderDetails: Array<OrderDetail> = await orderDetailsService.getUserOrdersDetails(orderId)
            await ctx.render('userordersDetail', { orderDetails: orderDetails, userDetails: user, userOrderDetails: order, orderId: orderId })
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : viewUserOrderDetail, Error : ${JSON.stringify(error)}`)
        }
    }

    async addOrder(ctx: Context) {
        try {
            let userEmail: string = ctx.cookies.get("user-detail");
            let user: User = await userService.getUsers(userEmail)
            let cartitems: Array<Cart> = await cartService.getCartItemByUserId(user.id)
            const uniqueOrderId: string = orderid.generate();
            let OrderDetail = []
            for (let i = 0; i < cartitems.length; i++) {
                let cartData = {
                    quantity: cartitems[i].quantity,
                    productId: Number(cartitems[i].product_id),
                    uniqueorderid: uniqueOrderId,
                }
                OrderDetail.push(cartData)
            }
            let totalorderamount = await orderDetailsService.addOrderDetails(OrderDetail)
            let orderDetail = {
                user_id: user.id,
                order_id: uniqueOrderId,
                total_order_amount: totalorderamount
            }
            await orderService.addOrder(orderDetail)
            await cartService.deleteFromCart(user.id)
            ctx.status = httpConstants.HTTP_CREATED
            await ctx.render('placedorder')
        }
        catch (error) {
            await ctx.redirect('login/cart')
        }
    }
}

const orderController: OrderController = new OrderController()
export default orderController