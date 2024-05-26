import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import passport from 'koa-passport'
import mount from 'koa-mount'
import serve from 'koa-static'
import helmet from 'koa-helmet'
import { Middleware } from 'koa-compose'
import http2 from 'http2'
import render from 'koa-ejs';
import path from 'path'
import errorMiddleware from '../app/core/middleware/ErrorMiddleware'
import config from '../resources/config'
import routes from '../app/routes'
const niv = require('node-input-validator');



const app: Koa = new Koa()
//const router=new Router();
// Loading certificates
const options: http2.SecureServerOptions = {
    // cert: fs.readFileSync(`${process.cwd()}/src/resources/cert/localhost.crt`),
    // key: fs.readFileSync(`${process.cwd()}/src/resources/cert/localhost.key`)
}

const _use: Function = app.use
app.use = (x: Middleware<any>) => _use.call(app, convert(x))

app.use(helmet())
app.use(logger())
app.use(bodyParser())

//app.use(koaBody({ patchNode: true, patchKoa: true, multipart: true }));
//app.use(errorMiddleware.errorMiddleware())
app.use(passport.initialize())
app.use(passport.session())
app.use(niv.koa());
render(app, {
    root: path.join(__dirname, '../views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});
app.use(serve(path.join(__dirname,'../public')));
// app.use(serve(path.join(__dirname,'../public')));

routes(app)

// show swagger only if the NODE_ENV is development and stagging
if (['development', 'staging'].includes(config.environment)) {
    app.use(mount('/swagger', serve(`${process.cwd()}/src/resources/swagger`)))
}

app.listen(config.port, () => {
    console.log("server started");
})
// http2
//     .createSecureServer(options, app.callback())
//     .listen(config.port, () => {
//         console.log(`Server started on ${config.port}`)
//     })


