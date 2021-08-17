import { Context } from "koa";
import jwt from 'jsonwebtoken'
import library from "../../db/entity/library";
import userValidator from '../../validation/custom/Validation'
import httpConstants from "../../constant/httpConstants";

export class Authentication {
     async signupUser(ctx: Context, next: any) {
          let userEmail = ctx.cookies.get("user-detail");
          let validation = await userValidator.signupUser(ctx)

          if (!validation) {
               if (userEmail == process.env.ADMIN_EMAIL) {
                    await ctx.render('adduser', { message: "Please Enter Correct Details" });
               } else {
                     await ctx.render('signup', { message: "Please Enter Correct Details" });
                     }
          } else {
               return next();
          }
     }


     async loginUser(ctx: Context, next:any) {
          const Validation = await userValidator.loginUser(ctx)
          if(!Validation){
               await ctx.render('login', { message: "Please Enter  Details" });
          }else{
               return next()
          }
     }

     async authUser(ctx: Context, next: any) {
          let useremail = ctx.cookies.get("user-detail");
          let token = ctx.cookies.get("token")
          if (!token) {
               ctx.status = httpConstants.HTTP_UNAUTHORISED
               await ctx.render('login', { message: "" })
          }
          try {
               const decode: any = jwt.verify(token, process.env.JWT_SECRET);
               if (!(useremail === decode.email)) {
                    await ctx.render('login', { message: "" })
               }
               return next()

          } catch (error) {
               console.log('invalid token');
               await ctx.render('login', { message: "Please Login In" })
          }

     }

     async checkUser(ctx: Context, next: any) {
          let userEmail = ctx.cookies.get("user-detail");
          let userModel = await library.User.findOne({
               where: {
                    email: ctx.request.body.email
               }
          })
          if (!userModel) {
               return next()
          }
          else {
               if (userEmail == process.env.ADMIN_EMAIL) {
                    await ctx.render('adduser', { message: 'User Already Exist' })
               }
               else {
                    await ctx.render('login', { message: 'User Already Exist. Please Login' })
               }
          }
     }
}

let authentication: Authentication = new Authentication();
export default authentication;
