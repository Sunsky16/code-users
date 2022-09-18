import Vue from 'vue'
import App from './App.vue'
import ElementUI, { Loading } from 'element-ui'; //引入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css'; //使用全部element样式
import router from './router' //引入路由
import axios from 'axios' //引入axios
//设置请求根路径
// axios.defaults.baseURL = 'http://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'

//设置axios请求拦截器
let loadingInstance = null
axios.interceptors.request.use((config) => {
    loadingInstance = Loading.service({
        fullscreen: screen,
        text: '正在拼命为您加载中...',
        background: 'rgba(0,0,0,.8)'
    })
    return config
})

//设置axios响应拦截器
axios.interceptors.response.use((response) => {
    loadingInstance.close()
    return response
})


Vue.filter('dataFormat', dtStr => {
        // console.log(dtStr);
        const dt = new Date(dtStr)
        const y = dt.getFullYear()
        const m = padZero(dt.getMonth() + 1)
        const d = padZero(dt.getDate())

        const hh = padZero(dt.getHours())
        const mm = padZero(dt.getMinutes())
        const ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}-${mm}-${ss}`
    })
    //添加一个不满两位数补零的函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}

Vue.prototype.$http = axios //配置全局axios
Vue.config.productionTip = false //关闭生产提示

Vue.use(ElementUI)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')