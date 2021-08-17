import Joi from 'joi';
class BookValidationSchema {
    constructor() { }
    static getConnectSchema = Joi.object({
        id: Joi.number().positive().required()
    })

    static addCommentSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    })

    static updatecommentSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        subject: Joi.string(),
        message: Joi.string()
    })

    static deleteCommentSchema = Joi.object({
        id: Joi.number().positive().required()
    })

}
export default BookValidationSchema;