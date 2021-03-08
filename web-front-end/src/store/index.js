import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  systemInfo: {
    name: '后台管理系统',
    version: 'v1.0.0'
  },
  userInfo: {
    userName: '',
    inId: '',
    isAdmin: false,
    isDefaultIn: false,
    isDefaultInAdmin: false
  },
  topNavName: '关联分析',
  token: localStorage.token
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  updateUserInfo(state) {
    state.userInfo.userName = localStorage.getItem('userName');
    state.userInfo.inId = localStorage.getItem('inId');
    state.userInfo.isAdmin = localStorage.getItem('roleName') === 'admin';
    state.userInfo.isDefaultIn = localStorage.getItem('defaultIn') === 'true';
    state.userInfo.isDefaultInAdmin = state.userInfo.isAdmin && state.userInfo.isDefaultIn;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
