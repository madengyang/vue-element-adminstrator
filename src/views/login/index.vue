<!-- 登录 -->
<template>
  <div class=''>
    <el-form :model="user">
      <el-input
        placeholder="请输入账号"
        v-model="user.username"
        clearable
      >
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="user.password"
        show-password
      ></el-input>
      <el-button
        type="primary"
        @click="login()"
      >登录</el-button>
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
      user: {
        username: 'admin',
        password: '111222'
      },
      loading: true,
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
      this.$store.dispatch('user/Login', this.user).then(() => {
        debugger
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
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
//@import url()
</style>