// require('./bootstrap');
// window.Vue = require('vue');
// window.VueRouter = require('vue-router');

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import router from '@/plugins/router'
import Antd from 'ant-design-vue'
import {Icon} from 'ant-design-vue'
import VueExcelXlsx from 'vue-excel-xlsx';
import App from '@/views/App'
import 'ant-design-vue/dist/antd.css';
import {post,get,put,deletes,postfile,toJson,isEmpty,apiHandle} from '@/plugins/http.js' // 请求方式中间件
import {api} from '@/plugins/api' // 后端API
import {returnInfo,formatFloat,hasRoute, toDateString} from '@/plugins/function' // 辅助方法
import VueLazyload from 'vue-lazyload' // 懒加载图片
import 'babel-polyfill' // 兼容IE


Vue.prototype.$api=api;
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$put=put;
Vue.prototype.$delete=deletes;
Vue.prototype.$postfile=postfile;
Vue.prototype.$toJson=toJson;
Vue.prototype.$isEmpty=isEmpty;
Vue.prototype.$apiHandle=apiHandle;
Vue.prototype.$returnInfo=returnInfo; // api返回信息做处理
Vue.prototype.$formatFloat=formatFloat; // 浮点型格式化
Vue.prototype.$hasRoute=hasRoute; // 是否存在路由
Vue.prototype.$toDateString=toDateString; // 格式化日期

Vue.config.productionTip = false;

// 字体图标 iconFont
const AFont = Icon.createFromIconfontCN({
    scriptUrl: '/assets/fonts/iconfont.js',
});
Vue.use(Antd);
Vue.use(VueExcelXlsx);
Vue.component('a-font', AFont);

Vue.use(VueLazyload); // 懒加载图片

// 跳转页面回到顶部
router.afterEach(() => {
    window.scrollTo(0,0);
});

Vue.use(VueRouter)

const app = new Vue({
    el: '#app',
    store,
    components: { App },
    router,
});
