import Joi from 'joi';
class UserValidationSchema {
    constructor() { }
    static getOrderSchema = Joi.object({
        id: Joi.number().positive().required()
    })

    static addOrderSchema = Joi.object({
        email: Joi.string().required(),
        productname: Joi.string().required(),
        price: Joi.number().positive().required(),
        status: Joi.string().required()

    })

    static updateOrderSchema = Joi.object({
        email: Joi.string(),
        productname: Joi.string(),
        price: Joi.number().positive(),
        status: Joi.string()
    })

    static deleteOrderSchema = Joi.object({
        id: Joi.number().positive().required()
    })

}
export default UserValidationSchema;