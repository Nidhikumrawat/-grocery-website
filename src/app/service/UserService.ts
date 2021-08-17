import { Context } from 'koa'
import library from '../db/entity/library'
import { User } from '../model/User';

class UserService {
    constructor() { }
    // service for adding the user
    async addUser(user) {
        await library.User.create({
            name: user.name,
            email: user.email,
            phoneno: user.phoneno,
            address: user.address,
            password: user.password
        })
    }
  
    async getAllUsers(ctx: Context): Promise<Array<User>> {
        let userModels = await library.User.findAll()

        let users: Array<User> = new Array<User>()

        for (let userModel of userModels) {
            let user: User = new User()
            user.setId(userModel.id)
            user.setName(userModel.name)
            user.setEmail(userModel.email)
            user.setPhoneno(userModel.phoneno)
            user.setAddress(userModel.address)
            user.setPassword(userModel.password)
            users.push(user)
        }
        return users
    }
    
    async getUser(useremail): Promise<User> {
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
            user.setPhoneno(userModel.phoneno)
            user.setPassword(userModel.password)
            user.setAddress(userModel.address)
        }
        return user
    }

    async updateUser(userDetails,userid) {
        let updateData = await library.User.update(userDetails, {
            where: {
                id: userid
            }
        })
        return updateData[0]
    }
}


let userService: UserService = new UserService()
export default userService
