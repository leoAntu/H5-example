<template>
  <div class="back" :class="isShow ? 'show' : 'hidden' ">
    <div class="backImgContainer" @click="back()">
      <img class="backImg" src="../assets/img/back/back@2x.png"/>
    </div>
    <span>{{title}}</span>
  </div>
</template>

<script>
  import {clickAnim} from "../utils/animate";

  export default {
    name: "back",
    props: {
      title: {
        type: String,
        default: '富卡 - 智能信贷金融专家'
      }
    },
    data() {
      return {
        isShow: true,
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      bindRollEvent() {
        const _this = this;
        let before = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        window.addEventListener('scroll', throttle, false);

        function throttle() {
          let after = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (before < after) {
            /**下滑**/
            if (after > 0) {//避免iOS到顶后页面回弹导致隐藏
              _this.isShow = false;
            }
          } else {
            /**上滚**/
            _this.isShow = true;
          }
          before = after
        }
      }
    },
    mounted() {
      clickAnim('backImgContainer');
      this.bindRollEvent();
    }
  }
</script>

<style scoped lang="less">
  .back {
    width: 100%;
    height: 0.88rem;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0.03rem 0.12rem 0 #d0d9e2;
    position: fixed;
    z-index: 999;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 0.34rem;
    .backImgContainer {
      height: 0.88rem;
      width: 0.88rem;
      position: absolute;
      left: 0;
      padding-left: 0.3rem;
      display: flex;
      align-items: center;
      transition: all .2s ease;
      .backImg {
        height: 0.31rem;
        width: 0.17rem;
      }
    }
  }

  .hidden {
    top: -0.88rem;
    transition: all 0.5s;
  }

  .show {
    top: 0;
    transition: all 0.8s;
  }
</style>
