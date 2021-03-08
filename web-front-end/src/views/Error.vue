<template>
  <div class="container">
    <div class="errorBox">
      <el-button class="btn btn-return" @click="goBack">返回</el-button>
      <router-link to="/">
        <el-button class="btn btn-refresh">首页</el-button>
      </router-link>
      <p class="errorBox-status">404</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  height: 100%;
}
.errorBox {
  position: relative;
  top: 50%;
  height: 400px;
  background: url(../assets/img/error/main.png) center center no-repeat;
  transform: translateY(-50%);
}
.btn {
  position: absolute;
  border: 0;
  box-shadow: none !important;
  background-color: transparent;
  color: white !important;
  font-size: 22px;
}
.btn-return {
  top: -70px;
  left: calc(~"50% - 320px - 120px");
  width: 176px;
  height: 124px;
  padding: 32px 28px 0 0;
  background-image: url(../assets/img/error/return-normal.png);
  &:hover {
    background: transparent url(../assets/img/error/return-active.png);
  }
}
.btn-refresh {
  top: -50px;
  right: calc(~"50% - 320px - 120px");
  width: 149px;
  height: 102px;
  padding: 8px 7px 0 0;
  background-image: url(../assets/img/error/refresh-normal.png);
  &:hover {
    background: transparent url(../assets/img/error/refresh-active.png);
  }
}
.errorBox-status {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #506c7a;
  font-size: 90px;
  transform: translate(-50%, -50%);
}
</style>
