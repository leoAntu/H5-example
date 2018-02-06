import Vue from 'vue'
export function getData(method,url) {
  let vue = new Vue();
  return vue.$http({
    url:vue.$getApi+url,
    method:method,
  })
}
