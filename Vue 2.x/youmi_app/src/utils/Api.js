export default {
  install(Vue) {
    Vue.prototype.$getApi = process.env.NODE_ENV === 'development' ? '/devApi' : '';
  }
}
