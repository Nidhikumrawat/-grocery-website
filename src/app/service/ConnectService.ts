import { Context } from 'koa'
import library from '../db/entity/library'
import { Connect } from '../model/Connect';


class ConnectService {
  constructor() { }

  async addComment(ctx: Context) {
    let name: string = ctx.request.body.name
    let email: string = ctx.request.body.email
    let subject: string = ctx.request.body.subject
    let message: number = ctx.request.body.message

    await library.Connect.create({
      name: name,
      email: email,
      subject: subject,
      message: message,
    })
  }

  async getAllFeedbacks(ctx: Context): Promise<Array<Connect>> {
    let connectModels = await library.Connect.findAll()

    let connects: Array<Connect> = new Array<Connect>()

    for (let connectModel of connectModels) {
      let connect: Connect = new Connect()
      connect.setId(connectModel.id)
      connect.setName(connectModel.name)
      connect.setEmail(connectModel.email)
      connect.setSubject(connectModel.subject)
      connect.setMessage(connectModel.message)
      connects.push(connect)
    }
    return connects
  }
}


let connectService: ConnectService = new ConnectService()
export default connectService