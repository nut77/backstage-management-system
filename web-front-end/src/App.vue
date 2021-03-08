<template>
  <div id="app">
    <el-container class="hfull">
      <el-header v-show="!isFullPage">
        <h3 class="header-title">{{$store.state.systemInfo.name}}</h3>
        <div class="nav-list">
          <p
            @click="$router.push(item.path)"
            v-for="item in navList"
            :class="{'nav-item': 'true', active: item.path === $route.path}"
            :key="item.path">
            {{item.name}}
          </p>
        </div>
        <i class="el-icon-switch-button" title="退出系统" @click="loginOut"></i>
      </el-header>
      <el-container>
        <el-main class="pd0">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          name: '参赛作品列表',
          path: '/menuList',
        },
        {
          name: '充值列表',
          path: '/prepaidPhoneList'
        },
      ],
      isFullPage: true
    }
  },
  methods: {
    loginOut() {
      localStorage.setItem('token', '');
      this.$router.push('/login');
    }
  },
  watch: {
    $route() {
      this.isFullPage = ['/login', '/error'].includes(this.$route.path);
    }
  }
}
</script>

<style lang="less">
  html,
  body,
  #app {
    height: 100%;
  }
  .el-header {
    display: flex;
    height: 50px !important;
    background-color: @colorHighlight;
    color: white;
    .el-icon-switch-button {
      color: #e62c2c;
      font-size: 23px;
      line-height: 52px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .header-title {
    width: 240px;
    font-family: "hyydtj" !important;
    font-size: 23px;
    font-weight: normal;
    line-height: 50px;
  }
  .nav-list {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 10px 20px;
  }
  .nav-item {
    padding: 0 15px;
    font-size: 16px;
    line-height: 47px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    & + & {
      margin-left: 40px;
    }
    &.active {
      border-bottom: 3px solid #1d6ce4;
    }
    &:hover {
      border-bottom: 3px solid rgba(29, 108, 228, 0.51);
    }
  }
</style>
