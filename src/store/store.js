import Vue from 'vue'
import Vuex from 'vuex'
import base from '@/common/base'
Vue.use(Vuex)
var currMonth = (new Date()).getMonth()
var month = currMonth < 10 ? '0' + currMonth : '' + currMonth
export default new Vuex.Store({
  state: {
    errorMsg: "",
    bankLevel: "core",
    orgId: "",
    userName:'',
    visitedViews: [],
    cachedViews: [],
    timeRange: "month",
    httpToken: "",
    timeDate: month==='00'? (((new Date()).getFullYear() - 1)+"12"):((new Date()).getFullYear()+""+month),
    menus:[]
  },
  getters: {
    visitedViews: state => state.visitedViews,
    cachedViews: state => state.cachedViews,
  },
  mutations: {
    changeTimeRange(state, data) {
      state.timeRange = data.type
      state.timeDate = data.date
    },
    setUserName(state, name) {
        state.userName = name
      },
    setErrorMsg(state, msg) {
      state.errorMsg = msg
    },
    setbankLevel(state, msg) {
      state.bankLevel = msg
    },
    setOrgId(state, msg) {
      state.orgId = msg
    },
    setHttpToken(state, msg) {
      state.httpToken = msg
    },
    setMenus(state, msg) {
      state.menus = msg
    },
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      let orgName = base.findNameFromOrgid(state.menus,state.orgId)
      state.visitedViews.push(
        Object.assign({}, view, {
          title: orgName + view.meta.title.substr(2,view.meta.title.length) || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },

    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: state => {
      state.visitedViews = []
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = []
    },

    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          let orgName = base.findNameFromOrgid(state.menus,state.orgId)
          v = Object.assign(v, view,{
            title: orgName + view.meta.title.substr(2,view.meta.title.length) || 'no-name'
          })
          break
        }
      }
    }

  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },

    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view)
        dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },

    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  }
})
