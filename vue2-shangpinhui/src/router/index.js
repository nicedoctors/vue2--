//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由
Vue.use(VueRouter);
import store from '@/store';
import routes from './routes'
// 备份VueRouter中的push
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|repla方法
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

//配置路由
let router =  new VueRouter({
    routes,
    mode:"hash",
    // 控制滚动条
    scrollBehavior (to, from, savedPosition) {
        return{ y:0 }
      }
})
// 前置路由守卫(在路由跳转之前判断)
router.beforeEach(async (to,from,next)=>{
    // to：跳转目的地
    // from: 跳转出发地
    // next: 放行
    // 用户登陆了才会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token){
        // 已登录则禁止前往login
        if(to.path=='/login'){
            next('/')
        }else{
            // 登录了但不前往login
            if(name){
                // 若已有用户信息，放行
                next()
            }else{
                // 若没有用户信息,则派发action获取用户信息
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    // 获取用户信息失败
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录交易相关全拦截
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            alert('请登录')
            next('/login?redirect='+toPath)
        }else{
            next();
        }
        
    }
})
export default router