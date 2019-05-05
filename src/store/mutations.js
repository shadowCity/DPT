define(function () {
  var base = requirejs('module/base')
  var muObj = {
    /**
     * 跳转下一步
     * @param {object} obj 页面参数
     * @returns {void}
     * */
    goNext: function (state, obj) {
      var nextName = ''
      var goPageObj
      if (obj.next && typeof obj.next === 'string') {
        nextName = obj.next
      } else {
        nextName = obj.next.pageName || ''
        goPageObj = {
          vue: obj.next.vue,
          params: obj.next.params || {},
          backFunName: obj.next.backFunName
        }
      }
      var routerName = ''
      if (!state.currentPage) {
        state.currentPage = state.transParams.indexPage
      }
      if (state.transParams.pages[state.currentPage].exit[nextName]) {
        routerName = state.transParams.pages[state.currentPage].exit[nextName]
        if (typeof routerName === 'object') {
          if (routerName.type === 'service') { // 调用的是服务组件
            muObj.execService(state, routerName.name)
            return
          } else { // 页面组件
            if (!routerName.keepStepNum) {
              state.currentStepNum += 1
            }
            routerName = routerName.name
          }
        } else {
          state.currentStepNum += 1
        }
      }
      if (routerName !== 'selfService' && routerName !== 'P00020') {
        state.currentPage = routerName || state.currentPage
        routerName = state.transParams.name + '_' + state.currentPage
      }
      if (goPageObj) {
        goPageObj = Object.assign({routerName: routerName}, goPageObj)
        base.goPage(goPageObj, {'errorMsg': obj.param})
      } else {
        base.goPage(routerName, {'errorMsg': obj.param})
      }
    },

    execService: function (state, name) {
      if (name) {
        var array = name.split('.')
        var serviceName
        var funcName
        if (array.length === 1) {
          serviceName = 'service'
          funcName = array[0]
        } else {
          serviceName = array[0]
          funcName = array[1]
        }
        var service = requirejs('service/' + serviceName)
        if (service && service[funcName]) {
          var params = state.transParams.pages[name] ? state.transParams.pages[name].params : {}
          var promise = service[funcName](params)
          if (promise instanceof Promise) {
            promise.then(function (exitName) {
              state.currentPage = name
              if (exitName) {
                if (typeof exitName === 'string') {
                  muObj.goNext(state, {'next': exitName})
                } else {
                  muObj.goNext(state, exitName)
                }
              } else {
                muObj.goNext(state, { 'next': 'error', 'param': '服务组件执行异常' })
              }
            }).catch(function () {
              muObj.goNext(state, { 'next': 'error', 'param': '服务组件执行异常' })
            })
          } else {
            muObj.goNext(state, {'next': 'error', 'param': '服务组件执行异常'})
          }
        }
      }
    },

    /**
     * 跳转上一步
     * @param {String} lastPageName 返回页面名称
     * @returns {void}
     * */
    goPrePage: function (state, lastPageName) {
      // 当前路由名
      var currentPageName = state.currentPage
      if (lastPageName.indexOf('_') > 0) {
        state.currentPage = lastPageName.split('_')[1]
      } else {
        state.currentPage = lastPageName
      }
      // 获得要返回页面的路由名
      var goPageName = state.currentPage
      // 获取返回页面的出口数据对象
      var obj = state.transParams.pages[goPageName].exit
      // 遍历查询正向流程的计数器变化
      for (var x in obj) {
        if (typeof obj[x] === 'object') {
          if (obj[x].name === currentPageName) {
            if (!obj[x].keepStepNum) {
              state.currentStepNum -= 1
            }
            return
          }
        } else {
          if (obj[x] === currentPageName) {
            state.currentStepNum -= 1
            return
          }
        }
      }
    },

    /**
     * 保存交易参数数据
     * @param {Object} VUEX存储数据对象
     * @param {Object} transParams 交易参数数据
     * @returns {void}
     */
    saveTransParams: function (state, transParams) {
      state.transParams = transParams || {}
      state.currentTrans = transParams.name
    },

    /**
     * 初始化交易数据，包括交易参数数据、当前页面组件、当前步骤号、提示信息
     * @param {Object} VUEX存储数据对象
     * @returns {void}
     */
    initTransData: function (state) {
      state.transParams = {}
      state.currentStepNum = 1
      state.currentPage = ''
      state.tempMsg.msgZh = ''
      state.tempMsg.msgEn = ''
    },

    /**
     * 设置提示信息
     * @param {Object} VUEX存储数据对象
     * @param {Object} obj 提示信息
     * @param {String} obj.msgZh 中文提示信息
     * @param {String} obj.msgEn 英文提示信息
     * @returns {void}
     */
    setTempTitle: function (state, obj) {
      state.tempMsg.msgZh = obj.msgZh
      state.tempMsg.msgEn = obj.msgEn
    },

    /**
     * 保存客户信息
     * @param {Object} VUEX存储数据对象
     * @param {Object} userInfo 客户信息
     * @returns {void}
     */
    changeUserInfo: function (state, userInfo) {
      state.userInfo = userInfo
    },

    /**
     * 往路由表中添加路由
     * @param {Object} VUEX存储数据对象
     * @returns {void}
     */
    addTransRoute (state, name) {
      state.transRouteArray.push(name)
    },

    /**
     * 弹出当前交易路由
     * @param {Object} VUEX存储数据对象
     * @returns {void}
     */
    removeTransRoute (state, index) {
      if (index) {
        state.transRouteArray.splice(index)
      } else {
        state.transRouteArray.pop()
      }
    },

    /**
     * 清空交易路由数据
     * @param {Object} VUEX存储数据对象
     * @returns {void}
     */
    clearTransRoute (state) {
      state.transRouteArray = []
    },

    /**
     * 设置数据到交易数据存储区
     * 如果key为对象，则将遍历对象内所有键值对并存储到交易数据存储区内，
     * 如果key为字符串，则将key-value存储到交易数据存储区内
     * @param {Object} VUEX存储数据对象
     * @param {any} value 存储的内容
     * @returns {void}
     */
    setStore (state, value) {
      var data = state[state.currentTrans]
      if (!data) {
        state[state.currentTrans] = data = {}
      }
      Object.assign(data, value)
    },

    /**
     * 清空交易存储数据
     * @param {Object} VUEX存储数据对象
     * @param {undefined|null|String} transCode 交易码，如果值为空则清空当前交易
     * @returns {void}
     */
    clearStore (state, transCode) {
      delete state[transCode || state.currentTrans]
    },

    /**
     * 隐藏/显示退出按钮
     * @param {Object} VUEX存储数据对象
     * @param {Boolean} flag true:隐藏，false：显示
     * @returns {void}
     */
    hideQuitBtn: function (state, flag) {
      state.quitBtnHiden = flag
    },

    /**
     * 隐藏/显示上一步按钮
     * @param {Object} VUEX存储数据对象
     * @param {Boolean} flag true:隐藏，false：显示
     * @returns {void}
     */
    hidePreBtn: function (state, flag) {
      state.preBtnHidenState = flag
    },

    /**
     * 隐藏/显示首页广告
     * @param {Object} VUEX存储数据对象
     * @param {Boolean} flag 是否显示首页广告，true:隐藏广告，false：显示广告
     * @returns {void}
     */
    hideAd: function (state, flag) {
      state.showAd = !flag
    },
    setMenu: function (state, menu) {
      state.menu = menu
    }
  }

  return muObj
})
