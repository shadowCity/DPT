<template>
  <div class="login-container">
    <el-row>
        <el-col :span="5"><div class="login-logo"></div></el-col>
        <el-col  :span="6" ><div class="login-sysName">网点运营管理平台</div></el-col>
    </el-row>
    <el-row>
        <el-col :span="2"><div class='first-col'>color</div></el-col>
        <el-col class="login-col" :span="10"><img :src="leftImg" class="login-left-img"></el-col>
        <el-col class="login-col" :span="12" >
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
              <h3 class="title"> 用户登录 </h3>
              <h3 class="title-enlish"> USER LOGIN </h3>
            </div>
            <el-form-item prop="username">
              <span class="svg-container">
                <img :src="userImg">
              </span>
              <el-input
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
                name="username"
                type="text"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <img :src="passwordImg">
              </span>
              <el-input
                :type="passwordType"
                v-model="loginForm.password"
                :placeholder="$t('login.password')"
                name="password"
                auto-complete="on"
                @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
              </span>
            </el-form-item>
            <el-button :loading="loading" class='login-submitButton' @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
        </el-col>
    </el-row>
  </div>
</template>
<script>
var auth = require('@/common/auth.js')
export default {
  name: 'Login',
  components: {  },
  data () {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      userImg: require('@/assets/login/user.png'),
      passwordImg: require('@/assets/login/password.png'),
      leftImg: require('@/assets/login/left.png'),
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        var self = this
        if (valid) {
          const params = {
            username: self.loginForm.username,
            password: auth.encrypt(self.loginForm.password)
            // password: self.loginForm.password
          }
          const options = {
            headers: { 'Content-Type': 'application/json' }
          }
          this.loading = true
          this.$http.post('login', params, options).then((result) => {
            if (!result.code) {
              this.$store.commit('setUserName', self.loginForm.username)
              var orgArray = []
              if (result.orgList) {
                orgArray = result.orgList
              } else {
                orgArray.push({ 'ORGID': result.orgId, 'ORGNAME_CN': result.orgName, 'ORGLEVELID': result.orgLevel, 'PARENTORGID': result.orgId })
              }
              this.$store.commit('setMenus', orgArray)
              this.$store.commit('setOrgId', result.orgId)
              this.$router.push('entry')
            } else {
              this.$store.commit('setErrorMsg', result.message)
              this.$router.push('error')
            }
          }).catch(function (err) {
            self.loading = false
            if (err.response && err.response.data && err.response.data.message) {
              self.$store.commit('setErrorMsg', err.response.data.message)
              self.$message({
                message: err.response.data.message,
                type: 'error'
              })
            } else {
              self.$message({
                message: '登录失败',
                type: 'error'
              })
            }
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  $bg:#283443;
  $light_gray:#4A4A4A;
  $cursor: #4A4A4A;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }
  .login-submitButton{
     width:100%;
     margin-bottom:30px
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        margin-left: 10px;
        caret-color: $cursor;
        &:-webkit-autofill {
           -webkit-box-shadow: 0 0 0px 1000px #FAFAFA inset !important;
           box-shadow: 0 0 0px 1000px #FAFAFA inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid #DFDFDF;
      background: #FAFAFA;
      border-radius: 5px;
      color: #454545;
    }
    .el-button{
      background: #258AFF;
      color: white;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/login/back.png');
  .login-logo{
    background-image: url('../../assets/login/logo.png');
    background-size: auto;
    background-repeat: no-repeat;
    height: 45px;
    margin-left: 2rem;
    margin-top: 1.5rem;
    padding: 3rem;
  }
  .login-col{
    height: calc(100vh - 300px);
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -webkit-box-orient: vertical;
  }
  .login-sysName{
    font-weight: bold;
    text-align: left;
    margin-top: 2.8rem;
    color: white;
  }
  .login-left-img{
    width:100%;
  }
  .first-col{
    color: transparent;
  }
  .login-form {
    width: 66.6%;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
    background-color: white;
    height: 400px;
    border-radius: 10px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #258AFF;
      margin: 0px auto;
      text-align: left;
      // font-weight: bold;
    }
    .title-enlish {
      font-size: 16px;
      color: #9B9B9B;
      margin: 0px auto 40px auto;
      text-align: left;
      // font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
