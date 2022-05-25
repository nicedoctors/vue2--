import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"
const state = {
    cartList: []
}
const actions = {
    // 获取购物车列表数据(不传参)
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车某一个产品(传参但不返回数据，即不三连环)
    async deleteCartListBySkuId({ commit },skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 切换购物车商品选中状态(传俩参，不返回数据)
    async updateCheckedById({ commit },{skuId,isChecked}) {
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if (result.code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库 commit[提交mutations修改state] getters[计算属性] dispatch[派发action] state[当前仓库数据]
        // 获取购物车中全部的产品(是一个数组)
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked===1?dispatch('deleteCartListBySkuId',item.skuId):''
            // 将每一次返回的promise添加到数组当中
            PromiseAll.push(promise)
        })
        // 都成功则成功，任意失败则失败
        return Promise.all(PromiseAll)
    },
    // 全选
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    },

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}
export default {
    state,
    actions,
    mutations,
    getters
}