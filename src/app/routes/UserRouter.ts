import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'
import productController from '../controller/ProductController'
import orderController from '../controller/OrderController'
import connectController from '../controller/ConnectController'
import cartController from '../controller/CartController'
import authentication from '../core/middleware/Authentication'

const userRouterManager: RouterManager = new RouterManager('/')

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

userRouterManager.post('admin/addProduct',authentication.authUser,productController.addProducts)

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


