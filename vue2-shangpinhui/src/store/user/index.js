import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const actions = {
    // 获取验证码  传参 三连
    async getCode({ commit },phone) {
        let result = await reqGetCode(phone)
        // 若可以发送验证码，以下均不需要
        if (result.code === 200) {
            commit("GETCODE", result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册 传参 无三连环
    async userRegister({ commit },user) {
        let result = await reqUserRegister(user)
        if (result.code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务[token] 传参 有三连
    async userLogin({ commit },data) {
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一标识符
        // 用token找服务器要信息
        if (result.code === 200) {
            commit("USERLOGIN",result.data.token)
            // 持久化存储token
            setToken(result.data.token);//本地存储
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }){
        let result = await reqUserInfo();
        if (result.code === 200) {
            commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }){
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        if (result.code === 200){
            commit("CLEAR")
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        // 仓库中用户数据清空
        state.token = ''
        state.userInfo={}
        // 本地存储数据清空
        removeToken()
    }

}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}