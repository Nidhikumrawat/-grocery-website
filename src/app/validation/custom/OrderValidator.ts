import { Context } from 'koa'
import httpConstants from '../../constant/httpConstants'
import OrderValidationSchema from '../schema/OrderValidationSchema';
import joiValidator from '../joi/validator';
export class OrderValidator {
    constructor() { }

    async getUser(ctx: Context) {
        //joi validation for request
        await joiValidator.joiValidation(ctx.params, OrderValidationSchema.getOrderSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async addUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, OrderValidationSchema.addOrderSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async updateUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, OrderValidationSchema.updateOrderSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        let bookDetails = ctx.request.body

        if (Object.keys(bookDetails).length === 0) {
            response.isValid = false
            response.status = httpConstants.HTTP_UNPROCESSABLE_ENTITY
            response.data['error'] = 'Please provide book details to update'
            return response
        }

        return response
    }

    async deleteUser(ctx: Context) {
        await joiValidator.joiValidation(ctx.params, OrderValidationSchema.deleteOrderSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }
}

const orderValidator: OrderValidator = new OrderValidator()

export default orderValidator