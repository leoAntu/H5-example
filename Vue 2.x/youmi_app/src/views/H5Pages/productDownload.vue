<template>
  <div class="productDownload">
    <div class="header">
      <img class="productDownloadBtn" @click="productDownload"
           src="../../assets/img/productDownload/dl_btn_top@2x.png"/>
    </div>
    <img v-lazy="require('../../assets/img/productDownload/productDownload_03.png')"/>
    <img v-lazy="require('../../assets/img/productDownload/productDownload_04.png')"/>
    <img v-lazy="require('../../assets/img/productDownload/productDownload_05.png')"/>
    <img v-lazy="require('../../assets/img/productDownload/productDownload_06.png')"/>
    <div class="footer">
      <img class="productDownloadBtn" @click="productDownload"
           src="../../assets/img/productDownload/dl_btn_bottom@2x.png"/>
    </div>

    <!--遮罩-->

    <transition name="fade" mode="out-in">
      <div class="cover" v-show="showCover" @click="showCover = false">
        <img src="../../assets/img/productDownload/openInBrowser@2x.png"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import {clickAnim} from "../../utils/animate";
  import {BaiduTongji} from "../../utils/BaiduTongji";

  export default {
    name: "product-download",
    data() {
      return {
        showCover: false
      }
    },
    methods: {
      productDownload() {
        let ua = navigator.userAgent.toLowerCase();
        /**判断是否手机**/
        if (ua.indexOf('mobile') >= 0) {
          /**判断是否安卓**/
          if (ua.indexOf('android') >= 0) {
            // /**判断是否微信**/
            // if (ua.indexOf('micromessenger') >= 0) {
            //   this.showCover = true
            // } else {
            //   window.location.href = 'http://down.limayq.com/app/1.0.1_101_17_fullcard_sign.apk'
            // }
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.fuyin.fullcard';
            /**判断是否苹果**/
          } else if (ua.indexOf('iphone') >= 0) {
            // alert('iOS版程序猿哥哥正在紧急研发中，敬请期待哦~')
            window.location.href = 'https://itunes.apple.com/cn/app/id1331884014';
          }
        } else {
          alert('请用手机浏览器打开哦~')
        }
      },
    },
    created() {

    },
    mounted() {
      clickAnim('productDownloadBtn');
      BaiduTongji();
    }
  }
</script>

<style scoped lang="less">
  .productDownload {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      width: 100%;
      height: 1.92rem;
      background: url('../../assets/img/productDownload/productDownload_02.png') center center no-repeat;
      background-size: cover;

      display: flex;
      justify-content: center;

      img { // 下载按钮
        margin-top: 0.56rem;
        width: 4.22rem;
        height: 1.22rem;

        transition: all .2s ease;
        transform-origin: bottom;
      }
    }

    .footer {
      width: 100%;
      height: 5.31rem;
      background: url('../../assets/img/productDownload/productDownload_07.png') center center no-repeat;
      background-size: cover;

      display: flex;
      justify-content: center;

      img { // 下载按钮
        margin-top: 1.83rem;
        width: 4.22rem;
        height: 1.22rem;

        transition: all .2s ease;
        transform-origin: bottom;
      }
    }

    img {
      width: 100%;
    }
    img[lazy=loading] {
      width: 0.8rem;
      height: 8.6rem;
      margin: auto;
    }

    .cover {
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: flex-end;
      img {
        height: 2.72rem;
        width: 5.48rem;
      }
    }
  }
</style>
