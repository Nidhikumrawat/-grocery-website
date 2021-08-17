import { Context } from 'koa'
import library from '../db/entity/library'
import { OrderDetail } from '../model/OrderDetail';
import { Product } from '../model/Product';
import productService from './ProductService';

class OrderDetailsService {
  constructor() { }

  async addOrderDetails(orderdetails) {
    let totalorderamount = 0;
    for (let i = 0; i < orderdetails.length; i++) {
      let productid: number = orderdetails[i].productId;
      let product = await productService.getProductByProductId(productid)
      totalorderamount += (product.price) * orderdetails[i].quantity
      interface orderdetailstypes {
        order_id: string;
        product_id: number;
      }
      let orderDetails: orderdetailstypes = {
        order_id: orderdetails[i].uniqueorderid,
        product_id: productid
      }
      await library.Orderdetail.create(orderDetails)
    }
    return totalorderamount
  }


  async getUserOrdersDetails(orderid): Promise<Array<OrderDetail>> {
    let orderModels = await library.Orderdetail.findAll({
      where: {
        order_id: orderid

      }
    })

    let orders: Array<OrderDetail> = new Array<OrderDetail>()

    for (let orderModel of orderModels) {
      let order: OrderDetail = new OrderDetail()
      order.setId(orderModel.id)
      order.setOrderid(orderModel.order_id)
      order.setProductId(orderModel.product_id)
      orders.push(order)
    }

    let orderDetails = [];
    for (let i = 0; i < orders.length; i++) {
      let productId = orders[i].product_id
      let productDetail: Product = await productService.getProductByProductId(productId)
      let productDetails = {
        productName: productDetail.name,
        description: productDetail.description,
        price: productDetail.price
      }
      orderDetails.push(productDetails)
    }
    return orderDetails
  }

  async getOrderById(orderid): Promise<OrderDetail> {
    let orderModel = await library.Orderdetail.findOne({
      where: {
        orderid: orderid
      }
    })
    console.log(orderModel);
    let order: OrderDetail = new OrderDetail()
    return order
  }
}


let orderDetailsService: OrderDetailsService = new OrderDetailsService()
export default orderDetailsService
