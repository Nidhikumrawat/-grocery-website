import { Context } from 'koa'
import httpConstants from '../../constant/httpConstants'
import ConnectValidationSchema from '../schema/ConnectValidationSchema';
import joiValidator from '../joi/validator';
export class ConnectValidator {
    constructor() { }

    async getComment(ctx: Context) {
        //joi validation for request
        await joiValidator.joiValidation(ctx.params, ConnectValidationSchema.getConnectSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async addComment(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, ConnectValidationSchema.addCommentSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

    async updateComment(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, ConnectValidationSchema.updatecommentSchema)
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

    async deleteComment(ctx: Context) {
        await joiValidator.joiValidation(ctx.params, ConnectValidationSchema.deleteCommentSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }
}

const connectValidator: ConnectValidator = new ConnectValidator()

export default connectValidator