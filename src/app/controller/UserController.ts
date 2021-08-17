import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import userService from '../service/UserService'
import { User } from '../model/User'
import apiErrorHandler from '../utils/ApiErrorHandler'
import { password } from '../service/passwordgenerator'
import generateMail from '../service/generateMail'
import bcrypt from 'bcrypt'
import { getMaxListeners } from 'process'

class UserController {
    constructor() { }


    async login(ctx: Context) {
        await ctx.render('login');
    }

    async index(ctx: Context) {
        ctx.cookies.set("user-detail", "null", { httpOnly: false })
        await ctx.render('index');
    }

    async signup(ctx: Context) {
        await ctx.render('signup');
    }

    async users(ctx: Context) {
        let useremail: string = ctx.cookies.get("user-detail");
        if (useremail === undefined) {
            await ctx.render('login')
        } else {
            await ctx.render('users');
        }
    }

    async admin(ctx: Context) {
        let useremail: string = ctx.cookies.get("user-detail");
        if (useremail === undefined) {
            await ctx.render('login')
        } else {
            await ctx.render('adminpage');
        }
    }

    async addUserPage(ctx: Context) {
        let useremail: string = ctx.cookies.get("user-detail");
        if (useremail === undefined) {
            await ctx.render('login')
        } else {
            await ctx.render('adduser');
        }
    }


    async updateUser(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if (useremail == undefined) {
                await ctx.render('login')
            } else {
                let user: User = await userService.getUser(useremail)
                let name: string = user.name;
                let phoneno: number = user.phoneno;
                let address: string = user.address;
                let password: string = user.password;
                console.log(user);
                let userdetails = {
                    name: user.name,
                    phoneno: user.phoneno,
                    address: user.address,
                    password: user.password,
                    useremail: useremail
                }
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.render('updateuser', { userdetails: userdetails });
                //await ctx.render('updateuser', { name: name, phoneno: phoneno, address: address, password: password, useremail: useremail });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : updateUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async logout(ctx: Context) {
        ctx.cookies.set("user-detail", "null", { httpOnly: false })
        await ctx.render('index');
    }

    async listAllUsers(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if (useremail === undefined) {
                await ctx.render('login')
            } else {
                let users: Array<User> = await userService.getAllUsers(ctx)
                ctx.status = httpConstants.HTTP_SUCCESS_OK
                await ctx.render('userdetails', { userdata: users });
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllUsers, Error : ${JSON.stringify(error)}`)
        }
    }

    async updateUserData(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if (useremail === undefined) {
                await ctx.render('login')
            } else {
                console.log(ctx.request.body.address);
                let user: User = await userService.getUser(useremail)
                let hash: string = user.password;
                let passwordLength: number = (ctx.request.body.currentpassword).length;
                interface userDetailsType {
                    name: string;
                    phoneno: number;
                    address: string;
                    password: string;
                }
                if (!passwordLength) {
                    let userDetails: userDetailsType = {
                        name: ctx.request.body.name,
                        phoneno: ctx.request.body.phoneno,
                        address: ctx.request.body.address,
                        password: ctx.request.body.password
                    }
                    let updatedCount = await userService.updateUser(userDetails, user.id)

                    if (!updatedCount) {
                        ctx.status = httpConstants.HTTP_CONFLICT
                    } else {
                        ctx.status = httpConstants.HTTP_SUCCESS_OK
                        await ctx.render('users')
                    }

                } else {
                    let currentPassword: string = ctx.request.body.currentpassword;
                    let validpassword: boolean = bcrypt.compareSync(currentPassword, hash)
                    if (!validpassword) {
                        ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR
                        throw new Error(" Entered Incorrect password")
                    } else {
                        if ((ctx.request.body.newpassword == ctx.request.body.confirmpasswod) && (ctx.request.body.newpassword.length != 0)) {
                            let saltRounds: number = 10;
                            let salt: string = await bcrypt.genSalt(10);
                            let encryptedpassword = await bcrypt.hash(ctx.request.body.newpassword, salt);

                            let userDetails: userDetailsType = {
                                name: ctx.request.body.name,
                                phoneno: ctx.request.body.phoneno,
                                address: ctx.request.body.address,
                                password: encryptedpassword
                            }

                            let updatedCount = await userService.updateUser(userDetails, user.id)

                            if (!updatedCount) {
                                ctx.status = httpConstants.HTTP_CONFLICT
                                throw new Error("Password Doesn't match")
                            } else {
                                ctx.status = httpConstants.HTTP_SUCCESS_OK
                                await ctx.render('users')
                            }
                        } else {
                            ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR
                            throw new Error("Password Doesn't match")
                        }
                    }
                }
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : updateUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async validateUser(ctx: Context) {
        try {
            await ctx.validate({
                email: 'required',
                password: 'required'
            });
            let email: string = ctx.request.body.email;
            let user: User = await userService.getUser(email)
            const passwordEnteredByUser: string = ctx.request.body.password;
            let hash: string = user.password
            let validpassword: boolean = bcrypt.compareSync(passwordEnteredByUser, hash)
            if (!validpassword) {
                await ctx.render('login');
            } else {
                if (ctx.request.body.email == "patilpallavi059@gmail.com") {
                    ctx.cookies.set("user-detail", ctx.request.body.email, { httpOnly: false })
                    await ctx.render('adminpage')
                } else {
                    ctx.cookies.set("user-detail", ctx.request.body.email, { httpOnly: false })
                    await ctx.render('users');
                }
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : Invalid Username Or Password, Error : ${JSON.stringify(error)}`)
        }
    }

    async addUser(ctx: Context) {
        try {
            let useremail: string = ctx.cookies.get("user-detail");
            if (useremail === undefined) {
                await ctx.render('login')
            } else {
                await ctx.validate({
                    phoneno: 'required|minLength:10|maxLength:12',
                    name: 'required|minLength:3',
                    email: 'required',
                    address: 'required'
                });

                logger.info(`Controller : addUser, Request-Body : ${JSON.stringify(ctx.params)}`)
                let useremail: string = ctx.cookies.get("user-detail");
                let saltRounds: number = 10;
                let salt = await bcrypt.genSalt(10);
                let encryptedpassword: string = await bcrypt.hash(password, salt);
                let userEmailId: string = ctx.request.body.email;

                generateMail(userEmailId, password);
                interface types {
                    name: string;
                    email: string;
                    phoneno: number;
                    address: string;
                    password: string;
                }
                let user: types = {
                    name: ctx.request.body.name,
                    email: ctx.request.body.email,
                    phoneno: ctx.request.body.phoneno,
                    address: ctx.request.body.address,
                    password: encryptedpassword
                }

                await userService.addUser(user)
                ctx.status = httpConstants.HTTP_CREATED
                if (useremail == "patilpallavi059@gmail.com") {
                    await ctx.render('adminpage')
                } else {
                    await ctx.render('login');
                }
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addUser, Error : ${JSON.stringify(error)}`)
        }
    }
}

const userController: UserController = new UserController()
export default userController

