import { Context } from 'koa'
import { Op } from 'sequelize';
import library from '../db/entity/library'
import { Cart } from '../model/Cart';

class CartService {
    constructor() { }

    async addOrderToCart(order) {
        console.log(order);
        await library.Cart.create({
            email: order.email,
            productid: order.productid,
            totalprice: order.totalprice,
        })
    }

    async getCartItemByUserId(useremail): Promise<Array<Cart>> {
        let cartModels = await library.Cart.findAll({
            where: {
                email: useremail
            }
        })

        let carts: Array<Cart> = new Array<Cart>()

        for (let cartModel of cartModels) {
            let cart: Cart = new Cart()
            cart.setId(cartModel.id)
            cart.setEmail(cartModel.email)
            cart.setProductId(cartModel.productid)
            cart.setTotalPrice(cartModel.totalprice)
            carts.push(cart)
        }
        return carts
    }

    // service for deleting the book
    async deleteFromCart(cartid) {
        let item = await library.Cart.destroy({
            where: {
                id: {
                    [Op.in]: cartid
                }
            }
        })
    }

    async getCartItemById(cartid): Promise<Array<Cart>> {
        let cartModels = await library.Cart.findAll({
            where: {
                id: {
                    [Op.in]: cartid
                }
            }
        })

        let carts: Array<Cart> = new Array<Cart>()

        for (let cartModel of cartModels) {
            let cart: Cart = new Cart()
            cart.setId(cartModel.id)
            cart.setEmail(cartModel.email)
            cart.setProductId(cartModel.productid)
            cart.setTotalPrice(cartModel.totalprice)
            carts.push(cart)
        }
        return carts
    }

    async deleteItemFromCartById(cartid) {
        let item = await library.Cart.destroy({
            where: {
                id: cartid
            }
        })
    }
}


let cartService: CartService = new CartService()
export default cartService


