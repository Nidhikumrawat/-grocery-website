import { Context } from 'koa'
import { User } from '../model/User'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import userService from '../service/UserService'
import apiErrorHandler from '../utils/ApiErrorHandler'
import encryptPassword from '../service/EncrptPassword'

class UserController {
    constructor() { }

    async loginPage(ctx: Context) {
        await ctx.render('login', { message: "" });
    }

    async getIndexPage(ctx: Context) {
        ctx.status = httpConstants.HTTP_SUCCESS_OK
        await ctx.render('index');
    }

    async signupPage(ctx: Context) {
        ctx.status = httpConstants.HTTP_SUCCESS_OK
        await ctx.render('signup', { message: "" });
    }

    async users(ctx: Context) {
        ctx.status = httpConstants.HTTP_SUCCESS_OK
        await ctx.render('users');
    }

    async admin(ctx: Context) {
        ctx.status = httpConstants.HTTP_SUCCESS_OK
        await ctx.render('adminpage');
    }

    async addUserPage(ctx: Context) {
        ctx.status = httpConstants.HTTP_SUCCESS_OK
        await ctx.render('adduser', { message: "" });
    }

    async logout(ctx: Context) {
        ctx.cookies.set('user-detail', '', { httpOnly: false })
        ctx.cookies.set('token', '', { httpOnly: false })
        await ctx.render('login', { message: "" });
    }

    async updateUser(ctx: Context) {
        try {
            let userEmail: string = ctx.cookies.get("user-detail");
            let user: User = await userService.getUsers(userEmail)
            ctx.status = httpConstants.HTTP_SUCCESS_OK
            await ctx.render('updateuser', { userdetails: user });
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : updateUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async listAllUsers(ctx: Context) {
        try {
            let users: Array<User> = await userService.getAllUsers(ctx)
            ctx.status = httpConstants.HTTP_SUCCESS_OK
            await ctx.render('userdetails', { userdata: users });
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllUsers, Error : ${JSON.stringify(error)}`)
        }
    }

    async updateUserData(ctx: Context) {
        try {
            let userEmail: string = ctx.cookies.get("user-detail");
            let user: User = await userService.getUsers(userEmail)
            let userDetails = await userService.validateUser(ctx)
            if (Object.keys(userDetails).length === 0) {
                await ctx.render('users')
            }
            let updatedCount = await userService.updateUser(userDetails, user.id)
            if (!updatedCount) {
                ctx.status = httpConstants.HTTP_CONFLICT
                await ctx.render('users')
            } else {
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.redirect('updateuser')
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : updateUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async addUser(ctx: Context) {
        try {
            let userEmail: string = ctx.cookies.get("user-detail");
            await userService.addUser(ctx)
            ctx.status = httpConstants.HTTP_CREATED
            if (userEmail == process.env.ADMIN_EMAIL) {
                await ctx.render('adduser', { message: "User Added Successfully" });
            } else {
                await ctx.render('login', { message: "" });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addUser, Error : ${JSON.stringify(error)}`)
            await ctx.render('signup')
        }
    }

    async validateUser(ctx: Context) {
        try {
            let email: string = ctx.request.body.email;
            let user: User = await userService.getUsers(email)
            let passwordVerified = await encryptPassword.validatePassword(ctx.request.body.password, user.password)
            if (!passwordVerified) {
                await ctx.render('login', { message: "Incorrect Password" });
            } else {
                if (ctx.request.body.email == process.env.ADMIN_EMAIL) {
                    await userService.setCookies(ctx)
                    await ctx.render('adminpage')
                } else {
                    await userService.setCookies(ctx)
                    await ctx.render('users');
                }
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : Invalid Username Or Password, Error : ${JSON.stringify(error)}`)
            await ctx.render('login', { message: "Incorrect  Email or Password" })
        }
    }
}
const userController: UserController = new UserController()
export default userController