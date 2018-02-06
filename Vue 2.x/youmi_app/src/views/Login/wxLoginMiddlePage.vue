<template>

</template>

<script>
  export default {
    name: "wx-login-middle-page",
    mounted() {
      window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6950cdbfd9a60ec8&redirect_uri=https://apps.limayq.com&response_type=code&scope=snsapi_userinfo#wechat_redirect')
    }
  }
</script>

<style scoped>

</style>
