import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import store from './store';
import Utils from './assets/js/utils';
import SHA256 from 'js-sha256';

// 通用样式
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.less';

// 用户请求相关配置
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/dist_2021/api' : '/api';
axios.defaults.headers.common['authorization'] = store.state.token;
Vue.config.productionTip = false;
Vue.prototype.$utils = Utils;
Vue.prototype.$axios = axios;
Vue.prototype.$sha256 = SHA256.sha256;

Vue.use(ElementUI, {size: 'medium'});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.token;
    if (token !== 'null' && token) {
      config.headers.common['authorization'] = token;
      return config;
    }

    if (config.url.includes('login')) return config;
  },
  error => {
    console.log('请求失败');
    console.log(error);
  });

// 添加返回拦截器
axios.interceptors.response.use(
  res => {
    if (location.pathname.includes('/login')) return res;
    if (res.data.code === 501 || res.data.code === 502 || res.data.code === 401 || res.data.code === 505) {
      // 您的用户名已在其它地方登录
      handleLoginOut(res.data.code === 505 ? '登录信息过期，请重新登录。' : res.data.message);
    } else {
      return res;
    }
  },
  error => {
    if (error.response) {
      if (error.response.status === 413) return Promise.reject(error.response.status);
      return handleLoginOut();
    }
  }
);

function handleLoginOut(msg = '') {
  Utils.localstorage({});
  if (window.location.pathname.includes('/login')) return false;
  ElementUI.Message({
    message: msg || '登录信息过期，请重新登录。',
    duration: 3000,
    onClose() {
      router.push('/login');
    }
  });
  return false;
}
