import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDoIssues from '../views/ToDoIssues.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ToDoIssues
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
