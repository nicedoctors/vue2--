// 当前这个模块：API进行统一的管理
import requests from "./request";
import mockRequest from './mockRequest'
// 三级联动接口  /api/product/getBaseCategoryList  get  无参数
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});
// 获取banner(轮播图接口)
export const reqGetBannerList = ()=>mockRequest.get('/banner')
// 获取floor数据
export const reqFloorList = ()=>mockRequest.get('/floor')
// 获取搜索模块数据 /api/list POST 需要参数
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})
// 获取产品详情信息的接口  /api/item/{ skuId }  get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})
// 将产品添加到购物车中(获取更新某一个产品的个数) /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
// 获取购物车列表的接口 /api/cart/cartList
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})
// 删除购物车商品的接口  /api/cart/deleteCart/{skuId}  delete
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 切换商品选中的状态的接口 /api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码的接口 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 注册的接口 /api/user/passport/register post
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})
// 登录的接口 /api/user/passport/login post
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户信息[需要带token向服务器要用户信息] /api/user/passport/auth/getUserInfo get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登录的接口  /api/user/passport/logout   get
export const reqLogout =()=>requests({url:'/user/passport/logout',method:'get'})
// 获取用户地址信息的接口 /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取商品清单的接口  /api/order/auth/trade get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})
// 提交订单的接口  /api/order/auth/submitOrder?tradeNo={tradeNo}  post  （不使用vuex
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 获取支付信息 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 获取支付订单状态   /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取个人中心 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})

