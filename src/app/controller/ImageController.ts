import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/httpConstants'
import library from '../db/entity/library'
import image from '../db/entity/library/demo';
import {Image } from '../model/demo'
import { Base64 } from 'base64-string';
import bodyParser from 'koa-bodyparser';
var fs = require('fs');
var path = require('path');
const multer = require('@koa/multer')
const uploadMulter = multer()
import koaBody = require('koa-body')

//app.use(koaBody({ patchNode: true, patchKoa: true, multipart: true }));


const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
      cb(null, path.join(__dirname ,'/public'))
  },
  filename: function (req:any, file:any, cb:any) {
      let type = file.originalname.split('.')[1]
      cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})
export var upload = multer({ storage: storage });


class ImageController {
    constructor() { }
    async getpage(ctx:Context){
        await ctx.render('page')
      }

      async demo(ctx:Context){
        await ctx.render('demo')
      }

      async postimage(ctx:Context){
        console.log('hello');
          // let file = ctx.request.fileToUpload;
          let file = ctx.request.files['fileToUpload'];
          console.log('file object',file);
          const {path, name, type , size} = ctx.request.files
          console.log(`path: ${size}`)
          // let fileToUpload = file.fileToUpload;
          // console.log(fileToUpload);
          // console.log("fie to upload",fileToUpload.path);
          // await fs.copy(fileToUpload.path, `public/avatars/${name}`)
         

            // await library.Image.create({
            //   image: file
            // })


            console.log('done');
      
         
        //   let userModel = await library.Image.findOne()
        //       console.log(userModel);
        //       let image: Image = new Image()
        //   if (userModel) {
        //       image.setId(userModel.id)
        //       image.setImage(userModel.image)
        //       image.setImagedata(userModel.imagedata)
        //  }
        //  let data = image.imagedata;
        // console.log(image);
          
      // console.log(image.image);
      // let binary = image.image;
      // const enc = new Base64();
      // const data = enc.urlEncode(binary);
      // console.log(data);
     //  await ctx.render('postpage',{data:data})
             
      }
}

const imageController: ImageController = new ImageController()
export default imageController
