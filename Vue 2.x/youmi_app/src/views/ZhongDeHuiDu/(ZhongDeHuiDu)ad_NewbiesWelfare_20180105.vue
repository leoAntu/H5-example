<template>
  <div class="advertise">
    <img class="flag1" v-lazy="require('../../assets/img/advertise/20180105/newbies_flag1.png')" />
    <img class="flag2" v-lazy="require('./新手福利_活动规则.png')" />
  </div>
</template>

<script>
  export default {
    name: "ad_newbies-welfare_20180105"
  }
</script>

<style scoped lang="less">

  .advertise {
    width: 100%;
    min-height: 100vh;
    background: url("../../assets/img/advertise/20180105/newbies_bg.jpg") top center no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    .flag1 {
      width: 92%;
      margin-top: 3.7rem;
    }
    .flag2 {
      width: 92%;
      margin-top: 0.4rem;
      margin-bottom: 0.63rem;
    }
  }

</style>
