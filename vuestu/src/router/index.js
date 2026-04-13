import { createRouter, createWebHistory } from 'vue-router'
import StudentInfo from '@/components/StudentInfo'
import StudentInsert from '@/components/StudentInsert'
import StudentEdit from '@/components/StudentEdit'

const routes = [{
    path: "/",
    redirect: "/info"
}, {
    path: '/info',
    name: 'StudentInfo',
    component: StudentInfo
}, {
    path: '/insert',
    name: 'StudentInsert',
    component: StudentInsert
}, {
    path: '/edit/:id',
    name: 'StudentEdit',
    component: StudentEdit
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router