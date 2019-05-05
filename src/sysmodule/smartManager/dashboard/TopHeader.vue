<template>
  <div class="top-header">
    <div v-if='bankLevel=="core"'>
      <el-menu :default-active="defaultActive" mode="horizontal" text-color="#A1ADBC">
        <el-menu-item index="1" @click='linkPanel("core","survey")'>概况</el-menu-item>
        <el-menu-item index="2" @click='linkPanel("core","custflow")'>客流</el-menu-item>
        <el-menu-item index="3" @click='linkPanel("core","queue")'>排队</el-menu-item>
        <el-menu-item index="4" @click='linkPanel("core","busiEfficiency")'>业务效率</el-menu-item>
        <el-menu-item index="5" @click='linkPanel("core","serviceQuality")'>服务质量</el-menu-item>
        <el-menu-item index="6" @click='linkPanel("core","hallMarket")'>厅堂营销</el-menu-item>
      </el-menu>
    </div>
    <div v-if='bankLevel=="branch"'>
      <el-menu :default-active="defaultActive" mode="horizontal" text-color="#A1ADBC">
        <el-menu-item index="1" @click='linkPanel("branch","survey")'>概况</el-menu-item>
        <el-menu-item index="2" @click='linkPanel("branch","custflow")'>客流</el-menu-item>
        <el-menu-item index="3" @click='linkPanel("branch","queue")'>排队</el-menu-item>
        <el-menu-item index="4" @click='linkPanel("branch","busiEfficiency")'>业务效率</el-menu-item>
        <el-menu-item index="5" @click='linkPanel("branch","serviceQuality")'>服务质量</el-menu-item>
        <el-menu-item index="6" @click='linkPanel("branch","hallMarket")'>厅堂营销</el-menu-item>
      </el-menu>
    </div>
    <div v-if='bankLevel=="entity"'>
      <el-menu :default-active="defaultActive" mode="horizontal" text-color="#A1ADBC">
        <el-menu-item index="1" @click='linkPanel("entity","survey")' class="el-menu-item-entity">概况</el-menu-item>
        <el-menu-item index="2" @click='linkPanel("entity","custflow")' class="el-menu-item-entity">客流</el-menu-item>
        <el-menu-item index="3" @click='linkPanel("entity","queue")' class="el-menu-item-entity">排队</el-menu-item>
        <el-menu-item index="4" @click='linkPanel("entity","busiEfficiency")' class="el-menu-item-entity">业务效率</el-menu-item>
        <el-menu-item index="5" @click='linkPanel("entity","serviceQuality")' class="el-menu-item-entity">服务质量</el-menu-item>
        <el-menu-item index="6" @click='linkPanel("entity","hallMarket")' class="el-menu-item-entity">厅堂营销</el-menu-item>
        <el-menu-item index="7" @click='linkPanel("entity","custMovingLine")' class="el-menu-item-entity">客户动线</el-menu-item>
        <el-menu-item index="8" @click='linkPanel("entity","bankteller")' class="el-menu-item-entity">柜员视角</el-menu-item>
      </el-menu>
    </div>
    <div class="top-header-user-info">
      <img class="top-header-img" :src="defaultHeadImg" width="40" height="40"/>
      <div class="top-header-user">{{username}}</div>
      <div class="top-header-quit" @click="quite">退出</div>
    </div>

    <theme-picker class="top-header-picker"></theme-picker>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import base from '@/common/base'
export default {
  data () {
    return {
      username: this.$store.state.userName,
      defaultActive: '1',
      defaultHeadImg: require('@/assets/nav_head.png')
    }
  },
  components: { ThemePicker },
  computed: {
    bankLevel: function () {
      return this.$store.state.bankLevel
    },
    orgId: function () {
      return this.$store.state.orgId
    }
  },
  watch: {
    bankLevel: function () {
      // this.linkIndex()
    },
    orgId: function () {
      // this.linkIndex()
    },
    $route (to, from) {
      this.menuDefaultActive(to.name)
    }
  },
  mounted () {
    // this.linkIndex()
  },
  methods: {
    linkIndex () {
      var currRoute = this.$route
      // 当改变总、分、支行才改变路由
      if (currRoute.path.indexOf(this.bankLevel + '_') < 0) {
        this.$router.push(this.bankLevel + '_survey')
      }
    },
    linkPanel (type, url, e) {
      var input = document.getElementsByClassName('el-menu-item')
      for (let index = 0; index < input.length; index++) {
        input[index].blur()
      }
      var routerUrl = type + '_' + url
      this.$router.push(routerUrl)
    },
    quite () {
      this.$router.push('login')
      this.$store.commit('setUserName', '')
      this.$store.commit('setHttpToken', '')
      this.$store.commit('setOrgId', '')
      this.$store.commit('DEL_ALL_VISITED_VIEWS')
      base.clearMap()
    },
    menuDefaultActive (routeName) {
      if (routeName.indexOf('_survey') >= 0) {
        this.defaultActive = '1'
      } else if (routeName.indexOf('_custflow') >= 0) {
        this.defaultActive = '2'
      } else if (routeName.indexOf('_queue') >= 0) {
        this.defaultActive = '3'
      } else if (routeName.indexOf('_busiEfficiency') >= 0) {
        this.defaultActive = '4'
      } else if (routeName.indexOf('_serviceQuality') >= 0) {
        this.defaultActive = '5'
      } else if (routeName.indexOf('_hallMarket') >= 0) {
        this.defaultActive = '6'
      } else if (routeName.indexOf('_custMovingLine') >= 0) {
        this.defaultActive = '7'
      } else if (routeName.indexOf('_bankteller') >= 0) {
        this.defaultActive = '8'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.top-header-picker{
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.top-header .el-menu-item-entity{
  padding: 0 2.6rem;
}
.top-header .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
  color: $menuBg !important;
}
.top-header-user-info{
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 4rem;
  top: 0.8rem;
  .top-header-user{
    margin-left: 1rem;
    margin-right: 1em;
    margin-top: 5px;
  }
  .top-header-quit{
    cursor: pointer;
  }
}

</style>
