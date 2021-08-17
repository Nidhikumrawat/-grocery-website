import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'
import productController from '../controller/ProductController'
import orderController from '../controller/OrderController'
import connectController from '../controller/ConnectController'
import cartController from '../controller/CartController'
import imageController from '../controller/ImageController';
import koaBody = require('koa-body')


const userRouterManager: RouterManager = new RouterManager('/')

userRouterManager.get('index/login', userController.login)

userRouterManager.get('index/signup', userController.signup)

userRouterManager.get('index', userController.index)

userRouterManager.get('user', userController.users)

userRouterManager.get('admin', userController.admin)

userRouterManager.get('logout',userController.logout)

userRouterManager.post('signup/adduser', userController.addUser)

userRouterManager.post('login/user', userController.validateUser)

userRouterManager.get('login/updateuser', userController.updateUser)

userRouterManager.get('admin/logout',userController.logout)

userRouterManager.post('admin/useradded', userController.addUser)

userRouterManager.get('admin/adduser', userController.addUserPage)

userRouterManager.get('admin/userdetails',userController.listAllUsers)

userRouterManager.post('login/updateuserdata', userController.updateUserData)

userRouterManager.get('admin/addproduct', productController.addProduct)

userRouterManager.post('admin/addProduct',productController.addProducts)

userRouterManager.get('admin/display', productController.getAllProductsForAdmin)

userRouterManager.get('login/listproducts', productController.getAllProducts)

userRouterManager.post('login/addtocart', cartController.addToCart)

userRouterManager.post('removecartitem', cartController.removeCartItem)

userRouterManager.get('login/cart', cartController.getAllCartItems)

userRouterManager.get('admin/orderlist', cartController.orderListForAdmin)

userRouterManager.post('login/emptycart',cartController.emptyCart)

userRouterManager.get('login/orders',orderController.getAllOrderForUser)

userRouterManager.post('admin/updatestatus',orderController.updateOrderStatus)

userRouterManager.post('admin/viewDetails',orderController.veiwOrderDetails)

userRouterManager.post('login/viewDetails',orderController.viewUserOrderDetail)

userRouterManager.post('order', orderController.addOrder)

userRouterManager.get('admin/feedback',connectController.getAllFeedbacks)

userRouterManager.post('index/contact', connectController.addComment)

userRouterManager.get('image',imageController.getpage)
userRouterManager.post('imagedata', koaBody({ patchNode: true, patchKoa: true, multipart: true }),imageController.postimage)
userRouterManager.get('demo',imageController.demo)

export default userRouterManager

