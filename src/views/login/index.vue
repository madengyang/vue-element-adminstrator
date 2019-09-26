<!-- 登录 -->
<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">登录</h3>
      <el-form-item
        label="账号"
        prop="username"
      >
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
        />
      </el-form-item>
      <div class="tips">{{loginError}}</div>
      <el-button
        type="primary"
        @click="login()"
      >登录</el-button>
      <!-- <el-button type="primary" @click="login">免验证登录</el-button> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111222'
      },
      loading: true,
      loginError: '',
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      this.$store.dispatch('Login', this.loginForm).then(response => {
        console.log(response)
        if (response.token) {
          console.log(this.$store.state.token)
          // this.$router.push({ path: "/" });
          debugger
          this.$store.dispatch('GetInfo', response.token).then(res => {
            console.log(res)
            if (res.status == 200) {
              let str = JSON.stringify(res.result.data);
              sessionStorage.setItem("userInfo", str);
              sessionStorage.setItem("city", res.result.data.City);
              sessionStorage.setItem("roles", res.result.data.roles);
              this.city = res.result.data.CityName;
              this.$router.go(0);
            } else {
              debugger;
              console.log("登录接口出错");
            }

          })
        } else {
          console.log("登录出错");
        }
      }).catch(() => {
        this.loading = true
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  padding-top: 100px;
}

.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  text-align: center;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.tips {
  height: 20px;
  font-size: 12px;
  color: #e52020;
  text-align: left;
  padding-left: 50px;
}
.login .el-button {
  width: 80%;
  margin-top: 10px;
}
</style>