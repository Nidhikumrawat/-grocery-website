import { Context } from 'koa'
import { Op } from 'sequelize';
import library from '../db/entity/library'
import { Cart } from '../model/Cart';
import { User } from '../model/User';
import userService from './UserService';

class CartService {
    constructor() { }
    // service to add in cart
    async addOrderToCart(ctx: Context) {
        let userEmail:string = ctx.cookies.get("user-detail");
        let userData: User = await userService.getUsers(userEmail)
        let cartData = {
            user_id: userData.id,
            product_id: ctx.request.body.productid,
            quantity: ctx.request.body.quantity
        }
        await library.Cart.create(cartData)
    }

    async getCartItemByUserId(userId): Promise<Array<Cart>> {
        let cartModels = await library.Cart.findAll({
            where: {
                user_id: userId
            }
        })
        let carts: Array<Cart> = new Array<Cart>()
        for (let cartModel of cartModels) {
            let cart: Cart = new Cart()
            cart.setId(cartModel.id)
            cart.setUserId(cartModel.user_id)
            cart.setProductId(cartModel.product_id)
            cart.setQuantity(cartModel.quantity)
            carts.push(cart)
        }
        return carts
    }

    async deleteFromCart(userId) {
        let item = await library.Cart.destroy({
            where: {
                user_id: userId
            }
        })
    }

    //Delete Cart Item By CartId
    async deleteItemFromCart(ctx: Context) {
        let cartid = ctx.request.body.cartid;
        let item = await library.Cart.destroy({
            where: {
                id: cartid
            }
        })
    }
}

let cartService: CartService = new CartService()
export default cartService