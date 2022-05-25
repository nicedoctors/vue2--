import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token:getUUID()
}
const actions = {
    // 获取产品信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 服务器存储成功--进行路由跳转传递参数
        if (result.code === 200) {
            return "ok"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    },
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const getters = {
    // 路径导航简化
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    actions,
    mutations,
    getters
}