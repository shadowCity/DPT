<template>
<div class="index-main">


  <el-row class="index-header">
  <el-col :span="4"><div class="index-logo"></div><div class="index-sysName">网点运营管理平台</div></el-col> <el-col  :span="20" ><top-header></top-header></el-col>
  </el-row>

  <el-row class="index-content">
  <el-col :span="4" class="index-left menu-bg">
     <left-menu></left-menu>
  </el-col>
   <el-col :push="4" :span="20" class="index-right">
     <el-row :span="24" class="index-tags-content"><tags-view></tags-view></el-row>
     <el-row :span="24" class="index-right-content">
        <div>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </el-row>
   </el-col>
  </el-row>
  </div>
</template>

<script>
// import data from "../dummy/index.json"
import TagsView from './TagsView.vue'
import LeftMenu from './LeftMenu.vue'
import TopHeader from './TopHeader.vue'
import base from '@/common/base'
export default {
  name: 'index',
  data: function () {
    return {

    }
  },
  components: {
    TagsView,
    LeftMenu,
    TopHeader
  },
  mounted () {
    base.init(this)
  },
  methods: {

  }
}
</script>

<style>
.index-header{
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.index-main{
 position:absolute;
 width:100%;
 height:100%;
}
.index-content{
  min-height: calc(100vh - 61px);
}
.index-left{
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
}
.index-tags-content{
  height: 40px;
  background-color: #f2f3f7;
}
.index-right-content {
  background: #f2f3f7;
}
.index-logo{
  background-image: url('../../../assets/jjLogo.png');
  background-size: auto;
  background-repeat: no-repeat;
  height: 45px;
  margin-left: 2rem;
  margin-top: 0.5rem;
}
.index-sysName{
  font-weight: bold;
  text-align: center;
}
</style>
