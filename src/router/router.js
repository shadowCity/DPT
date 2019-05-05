import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../module/login/index.vue'
import entry from '../module/entry/entry.vue'
import error from '../components/errorPage/404.vue'
import smartOperateRouter from './smartOperateRouter.js'
import smartMonitorRouter from './smartMonitorRouter.js'
import smartManagerRouter from './smartManagerRouter.js'
Vue.use(VueRouter)
export default new VueRouter({
  'routes': [{
    'path': '/login',
    'name': 'login',
    'component': login
  }, {
    'path': '/entry',
    'name': 'entry',
    'component': entry
  }, {
    'path': '/error',
    'name': 'error',
    'component': error
  },
  smartOperateRouter,
  smartMonitorRouter,
  smartManagerRouter
  ]
})
