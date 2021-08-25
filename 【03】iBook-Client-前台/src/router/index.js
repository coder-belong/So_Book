import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 解决路由重复跳转问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [
    {
        path: '/',
        // redirect: '/404',
        // redirect: '/detial',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('@/views/Home/Home.vue')
    },
    {
        path: '/detial',
        component: () => import('@/views/Detial/Detial.vue')
    },
    {
        path: '/404',
        component: () => import('@/components/common/NotFound.vue')
    }
]

const router = new VueRouter({
    routes
})




export default router

