import { Context } from 'koa'
import httpConstants from '../../constant/httpConstants'
import ProductValidationSchema from '../schema/ProductValidationSchema';
import joiValidator from '../joi/validator';
export class ProductValidator {
    constructor() { }

    async addProduct(ctx: Context) {
        joiValidator.joiValidation(ctx.request.body, ProductValidationSchema.addProductSchema)
        let response = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {}
        }

        return response
    }

       
}

const productValidator: ProductValidator = new ProductValidator()

export default productValidator