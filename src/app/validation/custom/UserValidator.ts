import { Context } from 'koa'
import httpConstants from '../../constant/httpConstants'
import UserValidationSchema from '../schema/UserValidationSchema';
import joiValidator from '../joi/validator';
export class UserValidator {
    constructor() { }

    async addUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, UserValidationSchema.addUserSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }
    
    async getUser(ctx: Context) {
        //joi validation for request
        await joiValidator.joiValidation(ctx.params, UserValidationSchema.getUserSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

   

    async updateUser(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, UserValidationSchema.updateUserSchema)
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
        await joiValidator.joiValidation(ctx.params, UserValidationSchema.deleteUserSchema);

        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }
    async checkUser(ctx: Context) {
        let useremail: string = ctx.cookies.get("user-detail");
        if ((useremail === undefined) || (useremail === null)) {
            await ctx.render('login')
        }
    }
}

const userValidator: UserValidator = new UserValidator()

export default userValidator