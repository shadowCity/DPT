<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
var http = require('./common/http')

export default {
  name: 'app',
  components: {

  },
  mounted () {
    http.init(this)
    this.$router.push('login')
    // this.$http.post("getData",{"name":"wind"})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
