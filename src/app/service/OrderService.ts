import { Context } from 'koa'
import library from '../db/entity/library'
import order from '../db/entity/library/order';
import { Order } from '../model/Order';

class OrderService {
    constructor() { }

    async addOrder(orderdetails) {
         await library.Order.create({
            email: orderdetails.email,
            productid: orderdetails.productid,
            orderid: orderdetails.orderid,
        })
    }
  }


let orderService: OrderService = new OrderService()
export default orderService

