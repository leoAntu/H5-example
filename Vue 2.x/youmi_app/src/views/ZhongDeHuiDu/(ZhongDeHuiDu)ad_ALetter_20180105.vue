<template>
  <div class="advertise">
    <img class="flag1" v-lazy="require('./一封信_信.png')" />
  </div>
</template>

<script>
  export default {
    name: "ad_-a-letter_20180105"
  }
</script>

<style scoped lang="less">

  .advertise {
    width: 100%;
    min-height: 100vh;
    background: url("../../assets/img/advertise/20180105/aletter_bg.jpg") top center no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    .flag1 {
      width: 100%;
      margin-top: 3.15rem;;
      margin-bottom: 1rem;
    }
  }

</style>
