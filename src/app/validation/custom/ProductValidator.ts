import { Context } from 'koa'
import httpConstants from '../../constant/httpConstants'
import ProductValidationSchema from '../schema/ProductValidationSchema';
import joiValidator from '../joi/validator';
export class UserValidator {
    constructor() { }

    async getUser(ctx: Context) {
        //joi validation for request
        await joiValidator.joiValidation(ctx.params, ProductValidationSchema.getProductSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async addProduct(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, ProductValidationSchema.updateProductSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async updateUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, ProductValidationSchema.updateProductSchema)
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
        await joiValidator.joiValidation(ctx.params, ProductValidationSchema.deleteProductSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }
}

const userValidator: UserValidator = new UserValidator()

export default userValidator