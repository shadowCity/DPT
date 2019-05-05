<template>
  <div class="entry-container">
      <div @click="linkSys('smartManager')">管理端</div>
      <div @click="linkSys('smartOperate')">智能运营</div>
      <div @click="linkSys('smartMonitor')">智能监控</div>

  </div>
</template>
<script>
export default {
  name: 'entry',
  components: {  },
  data () {
    return {

    }
  },
  watch: {

  },
  methods: {
    linkSys (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.entry-container{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>
