import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router) // регистрируем плагин роутера

export default new Router({
    mode: 'history', // чтоб работали стандартные роуты
    routes: [
        {
            path: '/',
            component: Home //либо так подключаем компонент
        }, {
            path: '/todos',
            component: () => import('./views/Todos') // либо так
        },
    ]
})