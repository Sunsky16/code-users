import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入路由组件
import UserList from '@/view/UserList.vue';
import UserDetail from '@/view/UserDetail.vue';

const router = new VueRouter({
    //路由规则
    routes: [
        { path: '/', redirect: '/users' },
        { path: '/users', component: UserList },
        { path: '/users/:id', component: UserDetail, props: true }
    ]
})

export default router