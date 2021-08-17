import { Context } from 'koa'
import { User } from '../model/User';
import { password } from '../service/passwordgenerator'
import library from '../db/entity/library'
import mailGenerator from './MailGenerator'
import encryptPassword from './EncrptPassword';
import jwt from 'jsonwebtoken'


class UserService {
    constructor() { }
    // service for adding the user
    async addUser(ctx: Context) {
        let encryptedPassword = await encryptPassword.encrpytPassword(password)
        let userEmailId: string = ctx.request.body.email;
        await mailGenerator.generateMail(userEmailId, password);

        await library.User.create({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            phone_no: ctx.request.body.phoneno,
            address: ctx.request.body.address,
            password: encryptedPassword
        })
    }

    async getUserById(userId): Promise<User> {
        let userModel = await library.User.findByPk(userId)
        let user: User = new User()
        if (userModel) {
            user.setId(userModel.id)
            user.setName(userModel.name)
            user.setEmail(userModel.email)
            user.setPhoneno(userModel.phone_no)
            user.setPassword(userModel.password)
            user.setAddress(userModel.address)
        }
        return user
    }

    async getAllUsers(ctx: Context): Promise<Array<User>> {
        let userModels = await library.User.findAll()
        let users: Array<User> = new Array<User>()
        for (let userModel of userModels) {
            let user: User = new User()
            user.setId(userModel.id)
            user.setName(userModel.name)
            user.setEmail(userModel.email)
            user.setPhoneno(userModel.phone_no)
            user.setAddress(userModel.address)
            user.setPassword(userModel.password)
            users.push(user)
        }
        return users
    }

    async getUsers(useremail): Promise<User> {
        let userModel = await library.User.findOne({
            where: {
                email: useremail
            }
        })
        let user: User = new User()
        if (userModel) {
            user.setId(userModel.id)
            user.setName(userModel.name)
            user.setEmail(userModel.email)
            user.setPhoneno(userModel.phone_no)
            user.setPassword(userModel.password)
            user.setAddress(userModel.address)
        }
        return user
    }

    async updateUser(userDetails, userid) {
        let updateData = await library.User.update(userDetails, {
            where: {
                id: userid
            }
        })
        return updateData[0]
    }

    async validateUser(ctx: Context) {
        let updateUserDetail = {}
        let { password, currentpassword, newpassword, confirmpassword } = ctx.request.body
        if (!(currentpassword.length)) {
            updateUserDetail = ctx.request.body
        } else {
            let validPassword: boolean = await encryptPassword.validatePassword(currentpassword, password)
            if (validPassword && (newpassword == confirmpassword) && (newpassword.length != 0)) {
                let encryptedPassword = await encryptPassword.encrpytPassword(newpassword)
                let userDetails = {
                    name: ctx.request.body.name,
                    phone_no: ctx.request.body.phone_no,
                    address: ctx.request.body.address,
                    password: encryptedPassword
                }
                updateUserDetail = userDetails
            }
        }
        return updateUserDetail
    }

    async setCookies(ctx: Context) {
        ctx.cookies.set("user-detail", ctx.request.body.email, { httpOnly: false })
        const token = jwt.sign({ email: ctx.request.body.email }, process.env.JWT_SECRET, { expiresIn: "20min" })
        ctx.cookies.set("token", token, { httpOnly: false })
    }
}
let userService: UserService = new UserService()
export default userService