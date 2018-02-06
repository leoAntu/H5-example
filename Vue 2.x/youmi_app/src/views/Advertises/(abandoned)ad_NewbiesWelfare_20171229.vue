<template>
  <div class="advertise">
    <img v-lazy="require('../../assets/img/advertise/20171229/NewbiesWelfare_flag@2x.png')" />
  </div>
</template>

<script>
  export default {
    name: "ad_newbies-welfare_20171229"
  }
</script>

<style scoped lang="less">

  .advertise {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background: url("../../assets/img/advertise/20171229/NewbiesWelfare_bg@2x.jpg") top center no-repeat;
    background-size: cover;

    img {
      width: 99.47%;
      margin-top: 5.6rem;
      margin-bottom: 0.5rem;
    }
  }

</style>
