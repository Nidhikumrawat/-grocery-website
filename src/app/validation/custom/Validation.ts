import { Context } from 'koa'
import { Validator } from "node-input-validator";


export class UserValidator {
     constructor() { }
     async signupUser(ctx: Context) {
          const valid = new Validator(ctx.request.body,
               {
                    email: 'required|email',
                    phoneno: 'required|minLength:10|maxLength:12',
                    name: 'required|minLength:3',
                    address: 'required|maxLength:400'
               }
          )
          const Validation = await valid.check()
          return Validation
     }

     async loginUser(ctx: Context) {
          const valid = new Validator(ctx.request.body,
               {
                    email: 'required|email|maxLength:255',
                    password: 'required'
               }
          )
          const Validation = await valid.check()
          return Validation
     }
     async addProduct(ctx: Context) {
          const valid = new Validator(ctx.request.body,
               {
                    name: 'required|minLength:1',
                    description: 'required|minLength:1|maxLength:100000',
                    price: 'required|minLength:1',
                    product_unit : 'required'
               }
          )
          const Validation = await valid.check()
          return Validation
     }
}

const userValidation: UserValidator = new UserValidator()

export default userValidation