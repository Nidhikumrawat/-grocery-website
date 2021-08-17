import Joi from 'joi';
class ProductValidationSchema {
  constructor() { }
  static getProductSchema = Joi.object({
    id: Joi.number().positive().required()
  })

  static addProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required()   
  })

  static updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
  })

  static deleteProductSchema = Joi.object({
    id: Joi.number().positive().required()
  })

}
export default ProductValidationSchema;