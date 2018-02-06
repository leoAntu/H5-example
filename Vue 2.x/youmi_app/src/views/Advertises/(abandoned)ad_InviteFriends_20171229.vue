<template>
  <div class="advertise">
    <img class="flag1" v-lazy="require('../../assets/img/advertise/20171229/InviteFriends_flag1@2x.png')" />
    <img class="flag2" v-lazy="require('../../assets/img/advertise/20171229/InviteFriends_flag2@2x.png')" />
  </div>
</template>

<script>
  export default {
    name: "ad_invite-friends_20171229"
  }
</script>

<style scoped lang="less">

  .advertise {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background: url("../../assets/img/advertise/20171229/InviteFriends_bg@2x.jpg") top center no-repeat #ff2671;
    background-size: contain;
    .flag1 {
      width: 92%;
      margin-top: 4.2rem;
    }
    .flag2 {
      width: 92%;
      margin-top: 0.4rem;
      margin-bottom: 0.55rem;
    }
  }

</style>
