import Joi from 'joi';
class CartValidationSchema {
    constructor() { }
    static getCartSchema = Joi.object({
        id: Joi.number().positive().required()
    })

    static addCartSchema = Joi.object({
        email: Joi.string().required(),
        productid: Joi.number().positive().required()
    })

    static updateCartSchema = Joi.object({
        email: Joi.string(),
        productid: Joi.number().positive()
    })

    static deleteCartSchema = Joi.object({
        id: Joi.number().positive().required()
    })

}
export default CartValidationSchema;