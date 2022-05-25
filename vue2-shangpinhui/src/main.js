import Vue from 'vue'
import App from './App.vue'
// 引入全局组件（三级联动组件
import TypeNav from '@/components/TypeNav'
// 参数1:全局组件名字，参数2:哪一个组件
Vue.component(TypeNav.name, TypeNav)
// 引入模拟数据
import '@/mock/mockServe'
//引入路由
import router from '@/router'
// 引入仓库
import store from './store'
// 引入UI组件库
import { Carousel, CarouselItem,Pagination,MessageBox  } from 'element-ui';
// 应用UI组件库
Vue.component('acarousel', Carousel);
Vue.component('acarousel-item', CarouselItem);
Vue.component('fenye', Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//统一接收api文件夹里面全部请求函数 
import * as API from '@/api'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入默认图片
import miko from '@/assets/1.gif'
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:miko
})
// 引入表单校验插件
import "@/plugins/validate"
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this 
    Vue.prototype.$API = API 
  },
  // 注册路由：组件实例上多了一个$router属性
  router,
  // 注册仓库：组件实例上多了一个$store属性
  store
}).$mount('#app')
