const mutations = {
  updateIsLogin(state, isLogin) {
    state.isLogin = isLogin;
    console.log('当前登录状态,isLogin:',isLogin)
  },
  updateUserInfo(state, userId) {
    state.userInfo.userId = userId;
    console.log('当前登录用户ID,userId:',userId)
  },
  updateActive(state, active) {
    state.active = active;
    console.log('当前激活的页面:',active);
  },
};
export default mutations
