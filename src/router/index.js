import{createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/stamdata',
            component: () => import('../views/Stamdata.vue')

        }
    ]
})

export default router