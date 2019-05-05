<template>
  <div class="occupied-content" ref="occupiedRef">
      <img :src="icon" alt="">
      <font>{{this.explain}}</font>
  </div>
</template>

<script>
export default {
  name: 'occuped',
  props: {
    height: {
      type: String,
      default: '200px'
    },
    explain: {
      type: String,
      default: '暂无数据'
    },
    icon: {
      type: String,
      default: require('@/assets/default_data_icon.jpg')
    },
    marginTop: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$refs.occupiedRef.style.height = this.height
    this.$refs.occupiedRef.style.marginTop = this.marginTop
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .occupied-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #9B9B9B;
        font-size: 18px;
        background: white;
        border-radius: 4px;
    }
</style>
