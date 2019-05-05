<template>
<div class="time-select-main">
  <div class="time-select-content">
    <div class="time-select-label" :class="{active:activeRange=='day'}" @click="changeRange('day')">日</div>
    <div class="time-select-label" :class="{active:activeRange=='month'}" @click="changeRange('month')">月</div>
    <div class="time-select-label" :class="{active:activeRange=='quarter'}" @click="changeRange('quarter')">季</div>
    <div class="time-select-label" :class="{active:activeRange=='year'}" @click="changeRange('year')">年</div>
  </div>
  <transition  name="bounce"><div v-if="showSelectPanel" class="time-select-arrayMain">
    <transition-group name="list" tag="div">
    <div  class="time-select-arrayItem" v-for="item in selectArray" :key="item.key">
      {{item.name}}
    </div>
    </transition-group>
  </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'timeSelect',
  data () {
    return {
      selectArray: [],
      currentDate: new Date(),
      activeRange: this.$store.state.timeRange,
      showSelectPanel: false
    }
  },
  methods: {
    changeRange (type) {
      var now = new Date()
      var date = null
      // 计算前一个月
      var currMonth = now.getMonth()
      var month = currMonth < 10 ? '0' + currMonth : '' + currMonth

      // 计算前一天
      var preDay = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      var tempMonth = preDay.getMonth() + 1
      var preMonth = tempMonth < 10 ? '0' + tempMonth : '' + tempMonth
      var day = preDay.getDate() < 10 ? '0' + preDay.getDate() : preDay.getDate()

      this.activeRange = type
      if (type === 'day') {
        date = preDay.getFullYear() + '' + preMonth + '' + day
      } else if (type === 'year') {
        date = (now.getFullYear() - 1) + ''
      } else if (type === 'quarter') {
        switch (month) {
        case '00':
        case '01':
        case '02':
          date = (now.getFullYear() - 1) + '10'
          break
        case '03':
        case '04':
        case '05':
          date = now.getFullYear() + '01'
          break
        case '06':
        case '07':
        case '08':
          date = now.getFullYear() + '04'
          break
        case '09':
        case '10':
        case '11':
          date = now.getFullYear() + '07'
          break
        }
      } else { // 其他默认为“月”
        if (month === '00') { // 如果为“1月”
          date = (now.getFullYear() - 1) + '12'
        } else {
          date = now.getFullYear() + '' + month
        }
      }
      this.$store.commit('changeTimeRange', { type: type, date: date })
    }
  },
  watch: {
    '$store.state.timeRange': function (newValue, oldValue) {
      this.activeRange = newValue
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';
.time-select-main{
    width: 13rem;
    display: inline-block;
}
.time-select-content{
    height:1.6rem;
    background: #e4e4e4;
    border-radius: 15px;
}
.time-select-label{
    float: left;
    text-align: center;
    width: 25%;
    height: 1.6rem;
    line-height: 1.6rem;
    cursor: pointer;
}
.time-select-label.active{
    background: $menuBg;
    border-radius: 15px;
    color: $menuText;
}
</style>
