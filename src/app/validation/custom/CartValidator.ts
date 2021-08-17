import { Context } from 'koa'
import httpConstants from '../../constant/httpConstants'
import CartValidationSchema from '../schema/CartValidationSchema';
import joiValidator from '../joi/validator';
export class CartValidator {
    constructor() { }

    async getUser(ctx: Context) {
        //joi validation for request
        await joiValidator.joiValidation(ctx.params, CartValidationSchema.getCartSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async addUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, CartValidationSchema.addCartSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async updateUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, CartValidationSchema.updateCartSchema)
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
        await joiValidator.joiValidation(ctx.params, CartValidationSchema.deleteCartSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }
}

const cartValidator: CartValidator = new CartValidator()

export default cartValidator