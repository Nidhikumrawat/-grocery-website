import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'
import productController from '../controller/ProductController'
import orderController from '../controller/OrderController'
import connectController from '../controller/ConnectController'
import cartController from '../controller/CartController'
import authentication from '../core/middleware/Authentication'
import multer from '@koa/multer';
import path from 'path';
import fs from 'fs';
// File upload configuration
// const upload = multer({
//     dest: 'uploads' // Destination folder for uploaded files
//   });
  
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/images/')  // Specify the directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


const userRouterManager: RouterManager = new RouterManager('/')

userRouterManager.post('upload',upload.single('file'), async (ctx, next) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",ctx.request)
    const { file } = ctx.request;
    console.log(file,__dirname,file.filename)
    const filePath = path.join('C:\\Users\\DELL\\Desktop\\Project\\ordering_app\\koa_application', 'uploads', file.filename);
  console.log("###########1",filePath)
    // Save the file to the server
    const reader = fs.createReadStream(file.path);
    console.log("###########2",filePath)

    const writer = fs.createWriteStream(filePath);
    console.log("###########3",filePath)

    reader.pipe(writer);
    console.log("###########4",filePath)
  
    // Store image path in the database
    // await pool.query('UPDATE products SET image_url = $1 WHERE id = $2', [filePath, ctx.request.body.productId]);
  
    ctx.status = 200;
    ctx.body = { success: true, message: 'Image uploaded successfully' };
  });


userRouterManager.get('index', userController.getIndexPage)

userRouterManager.get('index/signup',userController.signupPage)

userRouterManager.get('index/login', userController.loginPage)

userRouterManager.post('signup/adduser',authentication.signupUser,authentication.checkUser, userController.addUser)

userRouterManager.post('login/user', authentication.loginUser,userController.validateUser)
 
userRouterManager.post('index/contact', connectController.addComment)

// User Routes
userRouterManager.get('user', authentication.authUser,userController.users)

userRouterManager.get('login/updateuser', authentication.authUser,userController.updateUser)

userRouterManager.get('login/orders',authentication.authUser,orderController.getAllOrderForUser)

userRouterManager.post('login/addtocart',authentication.authUser,cartController.addToCart)

userRouterManager.get('login/listproducts',authentication.authUser ,productController.getAllProducts)

userRouterManager.post('login/removecartitem', authentication.authUser, cartController.removeCartItem)

userRouterManager.post('login/updateuserdata', authentication.authUser, userController.updateUserData)

userRouterManager.post('order', authentication.authUser, orderController.addOrder)

userRouterManager.post('login/viewDetails',authentication.authUser,orderController.viewUserOrderDetail)

userRouterManager.get('login/cart',authentication.authUser, cartController.getAllCartItems)

userRouterManager.post('login/emptycart',authentication.authUser,cartController.emptyCart)

userRouterManager.get('logout',userController.logout)

// Admin Routes
userRouterManager.get('admin/addproduct', authentication.authUser,productController.addProduct)

userRouterManager.post('admin/addProduct',authentication.authUser,upload.single('file'),productController.addProducts)

userRouterManager.get('admin/adduser', authentication.authUser, userController.addUserPage)

userRouterManager.post('admin/useradded',authentication.authUser,authentication.signupUser,authentication.checkUser, userController.addUser)

userRouterManager.get('admin/userdetails',authentication.authUser, userController.listAllUsers)

userRouterManager.get('admin', authentication.authUser,userController.admin)

userRouterManager.get('admin/display',authentication.authUser, productController.getAllProducts)

userRouterManager.get('admin/orderlist',authentication.authUser, orderController.orderListForAdmin)

userRouterManager.post('admin/updatestatus',authentication.authUser, orderController.updateOrderStatus)

userRouterManager.post('admin/viewDetails',authentication.authUser,orderController.veiwOrderDetails)

userRouterManager.get('admin/feedback', authentication.authUser, connectController.getAllFeedbacks)

userRouterManager.get('admin/logout',userController.logout)

export default userRouterManager


