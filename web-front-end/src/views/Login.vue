<template>
  <div class="container">
    <div class="loginBox">
      <h3 class="loginBox-title">{{$store.state.systemInfo.name}}</h3>
      <el-form ref="form" :model="form" label-width="0px">
        <el-form-item label="">
          <el-input
            maxlength=20
            v-model="form.username"
            placeholder="用户名"
            class="loginBox-input"
            @focus="msg=''"
            @keyup.enter.native="onSubmit">
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            maxlength=20
            v-model="form.password"
            onpaste="return false"
            placeholder="密   码"
            class="loginBox-input"
            type="password"
            v-show="!visiblePwd"
            @focus="msg=''"
            @keyup.enter.native="onSubmit">
          </el-input>
          <el-input
            maxlength=20
            v-model="form.password"
            onpaste="return false"
            placeholder="密   码"
            class="loginBox-input"
            v-show="visiblePwd"
            @focus="msg=''"
            @keyup.enter.native="onSubmit">
          </el-input>
        </el-form-item>
        <p class="loginBox-tip">{{msg}}</p>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="loginBox-btn" :loading="isLoading">登 录</el-button>
        </el-form-item>
        <div class="tip">
          <p v-if="visibleVersion">当前浏览器版本过低会影响体验，请升级到最新版本。</p>
          <p v-if="visibleRmd">推荐使用火狐或谷歌浏览器最新版，效果更佳。</p>
        </div>
      </el-form>
    </div>
    <div class="footer">{{$store.state.systemInfo.name}}{{$store.state.systemInfo.version}}</div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        isLoading: false,
        form: {
          username: '',
          password: ''
        },
        visiblePwd: false,
        msg: '',
        visibleviewPort: false,
        visibleVersion: false,
        visibleRmd: false
      };
    },
    methods: {
      // 获取浏览器版本号
      getVersion(browser) {
        let arr = navigator.userAgent.split(' ');
        let chromeVersion = '';
        for (let i = 0; i < arr.length; i++) {
          if (new RegExp(browser, 'i').test(arr[i])) {
            chromeVersion = arr[i];
          }
        }
        if (chromeVersion) {
          return chromeVersion.split('/')[1];
        }
        return false;
      },
      // 检查是否低于规定版本 // 谷歌.2987.133  火狐.64.0.2
      isLessThan(browser, version) {
        let [minChromeVersion, minFirefoxVersion] = ['57.0', '64.0'];
        let minVersionArr = browser === 'chrome' ? minChromeVersion.split('.') : minFirefoxVersion.split('.');
        let versionArr = version.split('.');
        for (let i = 0; i < versionArr.length; i++) {
          if (Number(versionArr[i]) < Number(minVersionArr[i])) {
            return true;
          }
        }
      },
      // 浏览器版本过低提示
      checkVersion() {
        let chromeVersion = this.getVersion('chrome');
        let firefoxVersion = this.getVersion('Firefox');
        if (chromeVersion) {
          this.visibleVersion = this.isLessThan('chrome', chromeVersion);
        } else if (firefoxVersion) {
          this.visibleVersion = this.isLessThan('Firefox', firefoxVersion);
        } else {
          this.visibleVersion = false;
          this.visibleRmd = true;
        }
      },
      onSubmit() {
        this.$refs['form'].validate(() => {
          // 用户名或密码为空时
          if (!this.form.username || !this.form.password) {
            this.msg = '请输入用户名或密码';
            return false;
          }
          // 验证用户名密码正确性
          this.isLoading = true;
          this.$axios.post(this.$utils.CONFIG.api.login, {
            loginName: this.form.username,
            password: this.$sha256.hmac(this.form.username, this.form.password)
          }).then(res => {
            // 登陆操作
            this.isLoading = false;
            this.msg = res.data.msg;
            if (res.data.code === 200) {
              // 添加登录用户信息
              this.$utils.localstorage({
                userName: this.form.username,
                token: res.data.data
              });
              setTimeout(() => {
                this.$router.push('/menuList');
              }, 1000);
            }
          }).catch(() => {
            this.$utils.showTip('error', 'success', '-1');
            this.isLoading = false;
          });
        });
      }
    },
    created() {
      this.checkVersion();
    },
    destroyed() {
      window.onresize = null;
    }
  };
</script>

<style lang="less" scoped>
  @colorHighlight: white;
  @itemHeight: 50px;
  @colorPlaceholder: #82939d;
  .container {
    height: 100%;
    background: url("../assets/img/login/bg.png") no-repeat fixed 50%;
    background-size: cover;
  }
  .loginBox {
    position: absolute;
    right: 100px;
    top: calc(~"50% - 30px");
    width: 550px;
    height: 340px;
    margin-top: -170px;
    text-align: center;
    .el-form {
      width: 250px;
      margin: @itemHeight auto;
    }
    .el-form-item {
      margin-bottom: 29px;
    }
  }
  .loginBox-title {
    color: @colorHighlight;
    font-family: "hyydtj" !important;
    font-size: 68px;
    font-weight: normal;
    line-height: 70px;
  }
  .loginBox-tip {
    margin: -13px 0 3px 0;
    color: #d1e9e2;
    line-height: 14px;
  }
  .loginBox-btn.el-button {
    height: @itemHeight;
    width: 100%;
    border: 0 none;
    background-color: #1aa8de;
    font-size: 18px;
    &:hover {
      opacity: 0.8;
    }
  }
  .tip {
    position: relative;
    top: -15px;
    font-size: 14px;
    text-align: left;
    line-height: 22px;
    color: #d1e9e2;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    line-height: 30px;
    text-align: center;
  }
</style>
