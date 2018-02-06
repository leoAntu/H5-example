<template>
  <div class="bankCard">
    <back :title="'我的银行卡'"></back>
    <card/>
    <div class="pocket">
      <p>借款通过申请后，我们会将你的所借款项发放到该银行卡。若重新绑卡，则新卡讲激活为收款银行卡。未完成借款期间不允许更换银行卡。</p>
      <div class="changeCardButton"></div>
    </div>
  </div>
</template>

<script>
  import back from '../../components/back'
  import card from '../../components/card'
  import {clickAnim} from "../../utils/animate";

  export default {
    name: "bank-card",
    methods: {
    },
    components:{
      back,
      card
    },
    mounted() {
      clickAnim('changeCardButton')
    }
  }
</script>

<style scoped lang="less">
  .bankCard {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pocket {
      background: url("../../assets/img/bankCard/pocket.png") center center no-repeat;
      background-size: cover;
      width: 100%;
      height: 4.5rem;
      position: absolute;
      z-index: 2;
      margin-top: 3.6rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        width: 92%;
        margin-top: 1.6rem;
        color: #666666;
        font-size: 0.3rem;
      }
      .changeCardButton {
        width: 3.71rem;
        height: 0.9rem;
        background: url("../../assets/img/bankCard/changeCardButton@2x.png") center center no-repeat;
        background-size: contain;
        margin-top: 0.5rem;
        transition: all .2s ease;
        transform-origin: bottom;
      }
    }
  }
</style>
