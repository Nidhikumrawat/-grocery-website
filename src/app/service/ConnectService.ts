import { Context } from 'koa'
import library from '../db/entity/library'
import { Connect } from '../model/Connect';

class ConnectService {
  constructor() { }

  async addComment(ctx: Context) {
    await library.Connect.create({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      subject: ctx.request.body.subject,
      message: ctx.request.body.message,
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