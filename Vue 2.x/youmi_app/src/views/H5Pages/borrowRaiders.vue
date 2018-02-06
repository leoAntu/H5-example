<template>
  <div class="borrowRaiders">
    <img src="../../assets/img/borrowRaiders/borrowRaiders_02.png"/>
    <img src="../../assets/img/borrowRaiders/borrowRaiders_03.png"/>
    <img src="../../assets/img/borrowRaiders/borrowRaiders_04.png"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_05.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_06.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_07.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_08.1.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_08.2.png')" @click="supportedCard()"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_08.3.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_09.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_10.png')"/>
    <img v-lazy="require('../../assets/img/borrowRaiders/borrowRaiders_11.png')"/>
    <div class="contactUs">
      <span>如您在申请过程中遇到其它问题，请咨询在线客服</span>
      <span>或拨打客服电话400-080-8012</span>
      <div class="hotLineButton" @click="contactUs">客服电话</div>
    </div>
  </div>
</template>

<script>
  import {clickAnim} from "../../utils/animate";
  import {BaiduTongji} from "../../utils/BaiduTongji";

  export default {
    name: "borrow-raiders",
    methods: {
      supportedCard() {
        this.$router.push({
          name: 'supportedBank'
        })
      },
      contactUs() {
        window.location.href = "tel:400-080-8012";
      }
    },
    mounted() {
      clickAnim('hotLineButton');
      BaiduTongji();
    }
  }
</script>

<style scoped lang="less">
  .borrowRaiders {
    width: 100%;
    font-size: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
    }
    img[lazy=loading] {
      width: 0.8rem;
      height: 4rem;
      margin: auto;
    }

    .contactUs {
      width: 92%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.28rem;
      margin-top: -2.48rem;
      position: relative;
      z-index: 10;
      span {
        margin-bottom: 0.16rem;
      }
      .hotLineButton {
        width: 85.8%;
        height: 0.8rem;
        margin-top: 0.22rem;
        background-color: #4089fe;
        border-radius: 0.08rem;
        font-size: 0.36rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        transition: all .2s ease;
        transform-origin: bottom;
      }
    }
  }
</style>
