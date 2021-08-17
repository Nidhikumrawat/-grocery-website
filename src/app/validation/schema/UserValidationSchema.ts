import Joi from 'joi';
class UserValidationSchema {
  constructor() { }
  static getUserSchema = Joi.object({
    id: Joi.number().positive().required()
  })

  static addUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneno: Joi.number().positive().required(),
    password: Joi.string(),
    address: Joi.string() 
    
  })

  static updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phoneno: Joi.number().positive(),
    password: Joi.string()  
  })

  static deleteUserSchema = Joi.object({
    id: Joi.number().positive().required()
  })

}
export default UserValidationSchema;