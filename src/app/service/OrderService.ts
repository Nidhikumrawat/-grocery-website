import { Context } from 'koa'
import library from '../db/entity/library'
import { Order } from '../model/Order';
import userService from './UserService';

class OrderService {
    constructor() { }

    async addOrder(orderdetails) {
        await library.Order.create(orderdetails)
    }

    async getUserOrders(userId): Promise<Array<Order>> {
        let orderModels = await library.Order.findAll({
            where: {
                user_id: userId

            }
        })
        let orders: Array<Order> = new Array<Order>()
        for (let orderModel of orderModels) {
            let order: Order = new Order()
            order.setId(orderModel.id)
            order.setUserId(orderModel.user_id)
            order.setOrderid(orderModel.order_id)
            order.setTotalOrderAmount(orderModel.total_order_amount)
            order.setCreatedAt(orderModel.createdAt)
            order.setStatus(orderModel.status)
            orders.push(order)
        }
      return orders
    }

    async getOrders(ctc: Context): Promise<Array<Order>> {
        let orderModels = await library.Order.findAll()
        let orders: Array<Order> = new Array<Order>()
        for (let orderModel of orderModels) {
            let order: Order = new Order()
            order.setId(orderModel.id)
            order.setUserId(orderModel.user_id)
            order.setOrderid(orderModel.order_id)
            order.setTotalOrderAmount(orderModel.total_order_amount)
            order.setCreatedAt(orderModel.createdAt)
            order.setStatus(orderModel.status)
            orders.push(order)
        }
       // return orders
        let orderDetails = []
        for (let i = 0; i < orders.length; i++) {
        let userId = orders[i].user_id
        let userDetail = await userService.getUserById(userId)
        let orderDetail = {
            userName: userDetail.name,
            order: orders[i]
        }
        orderDetails.push(orderDetail)
    }
    return orderDetails
    }


    async getOrder(id): Promise<Order> {
        let orderModel = await library.Order.findByPk(id)
        let order: Order = new Order()
        if (orderModel) {
            order.setId(orderModel.id)
            order.setUserId(orderModel.user_id)
            order.setOrderid(orderModel.order_id)
            order.setTotalOrderAmount(orderModel.total_order_amount)
            order.setCreatedAt(orderModel.createdAt)
            order.setStatus(orderModel.status)
        }
        return order
    }

    async updateOrderStatus(ctx:Context) {
        let { orderId, status } = ctx.request.body
        let order: Order = await orderService.getOrder(orderId)
        let updateStatus={
            user_id: order.user_id,
            order_id: order.order_id,
            createdAt: order.createdAt,
            status: status,
            total_order_amount: order.total_order_amount
        }
        let updateData = await library.Order.update(updateStatus, {
            where: {
                id: order.id
            }
        })
        return updateData[0]
    }
}

let orderService: OrderService = new OrderService()
export default orderService