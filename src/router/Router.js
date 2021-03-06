import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home"
import About from "../views/About"
import Dashboard from "../views/Dashboard"
Vue.use(VueRouter)

const routes = [
  { path: "/", name: "index", redirect: "/home" },
  { path: "/home", name: "home", component: Home },
  { path: "/about", name: "About", component: About },
  {
    path: "/dashboard", name: "dashboard", component: Dashboard, meta: {
      requireAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
