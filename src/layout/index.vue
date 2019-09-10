<!-- 组件说明 -->
<template>
  <div class='app-wrapper'>
    <!-- <div
    class='app-wrapper'
    :class="classObj"
  > -->
    <!-- <Sidebar /> -->
    <!-- <div class="main-container">
      <div class="fixed-header">
        <Navbar />
        <TagsView />
      </div>

      <AppMain />
    </div> -->
    <AppMain />
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import { mapState } from 'vuex'
import state from '@/store'
export default {
  components: {
    Sidebar,        //左导   
    Navbar,         //顶导
    TagsView,       //tabs切换
    AppMain         //主内容
  },
  computed: {
    // ...mapState({
    //   sidebar: state => state.app.sidebar,
    // })
  },
  methods: {
    classObj() {
      console.log(this.$store)
      debugger
      return {
        // hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>