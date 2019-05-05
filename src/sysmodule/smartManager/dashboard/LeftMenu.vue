<template>
<vue-scroll >
   <el-menu
        class="left-menu-height  menu-bg"
        default-active="0"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b">
        <!-- 总行、分行、支行都有权限 -->
        <div v-if="coreMeuns.length>0">
          <el-submenu id="leftMenu" v-for="(coreItem,coreIndex) in coreMeuns" :key="coreItem.ORGID" :index="coreIndex+''">
            <div slot="title" @click="link(1,coreItem.ORGID)" :id="'defaultActiveId'+coreIndex" class="top-bank-title">
              <i class="el-icon-menu"></i>
              <span>{{coreItem.ORGNAME_CN}}</span>
            </div>
            <div v-for="(branchItem,branchIndex) in branchMeuns" :key="branchItem.ORGID">
              <el-submenu :index="coreIndex+'-'+branchIndex" v-if="branchItem.PARENTORGID==coreItem.ORGID">
                <div slot="title" @click="link(2,branchItem.ORGID)"><span>{{branchItem.ORGNAME_CN}}</span></div>
                <div v-for="(entityItem,entityIndex) in entityMeuns" :key="entityItem.ORGID">
                  <el-menu-item :index="coreIndex+'-'+branchIndex+'-'+entityIndex"  @click="link(3,entityItem.ORGID)" v-if="entityItem.PARENTORGID==branchItem.ORGID">{{entityItem.ORGNAME_CN}}</el-menu-item>
                </div>
              </el-submenu>
            </div>
          </el-submenu>
        </div>
        <!-- 只有支行和分行权限 -->
        <div v-else-if="coreMeuns.length==0&&branchMeuns.length>0">
            <div v-for="(branchItem,branchIndex) in branchMeuns" :key="branchItem.ORGID">
              <el-submenu :index="branchIndex+''" id="leftMenu">
                <div slot="title" @click="link(2,branchItem.ORGID)" :id="'defaultActiveId'+branchIndex"><span>{{branchItem.ORGNAME_CN}}</span></div>
                <div v-for="(entityItem,entityIndex) in entityMeuns" :key="entityItem.ORGID">
                  <el-menu-item :index="branchIndex+'-'+entityIndex"  @click="link(3,entityItem.ORGID)">{{entityItem.ORGNAME_CN}}</el-menu-item>
                </div>
              </el-submenu>
            </div>
        </div>
        <!-- 只有分行权限 -->
        <div v-else>
          <div v-for="(entityItem,entityIndex) in entityMeuns" :key="entityItem.ORGID">
            <el-menu-item :index="entityIndex+''"  @click="link(3,entityItem.ORGID)" :id="'defaultActiveId'+entityIndex">{{entityItem.ORGNAME_CN}}</el-menu-item>
          </div>
        </div>
      </el-menu>
</vue-scroll>
</template>

<script>
var $ = require('jquery')
export default {
  data () {
    return {
      coreMeuns: [],
      branchMeuns: [],
      entityMeuns: []
    }
  },
  computed: {

  },
  mounted () {
    this.initMenus()
  },
  updated () {
    $('#defaultActiveId0').trigger('click')
  },
  methods: {
    link (index, name) {
      this.$store.commit('setOrgId', name)
      if (index === 1) {
        this.$store.commit('setbankLevel', 'core')
      } else if (index === 2) {
        this.$store.commit('setbankLevel', 'branch')
      } else {
        this.$store.commit('setbankLevel', 'entity')
      }
    },
    handleOpen (index) {
      $('#leftMenu').find('li').removeClass('is-active')
    },
    handleClose () {
      $('#leftMenu').find('li').removeClass('is-active')
    },
    initMenus () {
      this.$store.state.menus.map((item, index) => {
        if (item.ORGLEVELID === '1') {
          this.coreMeuns.push(item)
        } else if (item.ORGLEVELID === '2') {
          this.branchMeuns.push(item)
        } else {
          this.entityMeuns.push(item)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-bank-title{
    color:white;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: transparent;
  }
  .el-submenu__title:focus,.el-submenu__title:hover {
    background-color: transparent;
  }
  .left-menu-height{
    height: 100%;
  }
</style>
