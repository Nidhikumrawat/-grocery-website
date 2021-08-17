import { Context } from 'koa'
import library from '../db/entity/library'
import { OrderDetail } from '../model/OrderDetail';

class OrderDetailsService {
  constructor() { }

  async addOrderDetails(orderdetails) {
    console.log(orderdetails);
    await library.Orderdetail.create({
      name: orderdetails.name,
      email: orderdetails.email,
      phoneno: orderdetails.phoneno,
      address: orderdetails.address,
      productname: orderdetails.productname,
      description: orderdetails.description,
      totalprice: orderdetails.totalprice,
      orderid: orderdetails.orderid,
      price: orderdetails.price,
      quantity: orderdetails.quantity
    })
  }

  async getAllOrdersForAdmin(ctx: Context): Promise<Array<OrderDetail>> {
    let orderModels = await library.Orderdetail.findAll()
    let orders: Array<OrderDetail> = new Array<OrderDetail>()
    console.log(orderModels);
    for (let orderModel of orderModels) {
      let order: OrderDetail = new OrderDetail()
      order.setId(orderModel.id)
      order.setName(orderModel.name)
      order.setEmail(orderModel.email)
      order.setPhoneno(orderModel.phoneno)
      order.setProductName(orderModel.productname)
      order.setDescription(orderModel.description)
      order.setTotalPrice(orderModel.totalprice)
      order.setOrderid(orderModel.orderid)
      order.setCreatedAt(orderModel.createdAt)
      order.setPrice(orderModel.price)
      order.setQuantity(orderModel.quantity)
      order.setStatus(orderModel.status)
      order.setAddress(orderModel.address)
      orders.push(order)
    }
    return orders
  }

  async getAllOrders(ctx: Context): Promise<Array<OrderDetail>> {
    let useremail = ctx.cookies.get("user-detail");
    console.log(useremail);
    let orderModels = await library.Orderdetail.findAll({
      where: {
        email: useremail
      }
    })

    let orders: Array<OrderDetail> = new Array<OrderDetail>()

    for (let orderModel of orderModels) {
      let order: OrderDetail = new OrderDetail()
      order.setId(orderModel.id)
      order.setName(orderModel.name)
      order.setEmail(orderModel.email)
      order.setPhoneno(orderModel.phoneno)
      order.setProductName(orderModel.productname)
      order.setDescription(orderModel.description)
      order.setTotalPrice(orderModel.totalprice)
      order.setOrderid(orderModel.orderid)
      order.setCreatedAt(orderModel.createdAt)
      orders.push(order)
    }
    return orders
  }

  async getOrderById(orderid): Promise<OrderDetail> {
    let orderModel = await library.Orderdetail.findOne({
      where: {
        orderid: orderid
      }
    })
    let order: OrderDetail = new OrderDetail()

    if (orderModel) {
      order.setId(orderModel.id)
      order.setName(orderModel.name)
      order.setEmail(orderModel.email)
      order.setPhoneno(orderModel.phoneno)
      order.setProductName(orderModel.productname)
      order.setDescription(orderModel.description)
      order.setTotalPrice(orderModel.totalprice)
      order.setQuantity(orderModel.quantity)
      order.setStatus(orderModel.status)
      order.setAddress(orderModel.address)
      order.setPrice(orderModel.price)
      order.setOrderid(orderModel.orderid)
      order.setCreatedAt(orderModel.createdAt)
    }
    return order
  }

  async updateOrderStatus(updateStatus, orderDetailid) {
    let updateData = await library.Orderdetail.update(updateStatus, {
      where: {
        id: orderDetailid
      }
    })
    return updateData[0]
  }

}


let orderDetailsService: OrderDetailsService = new OrderDetailsService()
export default orderDetailsService
