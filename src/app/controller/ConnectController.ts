import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import connectService from '../service/ConnectService'
import connectValidator from '../validation/custom/ConnectValidator'
import apiErrorHandler from '../utils/ApiErrorHandler'
import { Connect } from '../model/Connect'

class ConnectController {
    constructor() { }

    async addComment(ctx: Context) {
        try {
            let validation = await connectValidator.addComment(ctx)
            if (!validation.isValid) {
                ctx.status = validation.status
                ctx.body = validation.data
                return
            }
            logger.info(`Controller : addComment, Request-Body : ${JSON.stringify(ctx.request.body)}`)
            await connectService.addComment(ctx)
            ctx.status = httpConstants.HTTP_CREATED;
            await ctx.render('index');
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : addComment, Error : ${JSON.stringify(error)}`)
        }
    }

    async getAllFeedbacks(ctx: Context) {
        try {
            let useremail = ctx.cookies.get("user-detail");
            if ((useremail === undefined) || (useremail === null)) {
                await ctx.render('login')
            } else {
                let feedbacks: Array<Connect> = await connectService.getAllFeedbacks(ctx)
                await ctx.render('feedbacks', { feedbacks: feedbacks })
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);
            logger.error(`Controller : getAllfeedbacks, Error : ${JSON.stringify(error)}`)
        }
    }
}

const connectController: ConnectController = new ConnectController()
export default connectController
