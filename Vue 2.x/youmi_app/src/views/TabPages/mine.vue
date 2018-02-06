<template>
  <div class="mine_container" style="padding-bottom: calc(0.98rem + env(safe-area-inset-bottom));">
    <div class="header">

      <div class="banner">
        <span class="banner_title">{{banner_title}}</span>
        <span class="banner_text">{{banner_text}}</span>
      </div>

      <div class="login" v-if="!isLogin">
        <div class="login_button" @click="toLogin">注册/登录</div>
        <div class="login_text">立即注册，即可享受APP借款8折优惠</div>
      </div>

      <div class="settings">
        <div class="each_setting setting_left">
          <div class="each_setting_img"
               :style="{backgroundImage:`url(${require('../../assets/img/mine/icon_Quota@2x.png')})`}"></div>
          <span class="each_setting_title">我要提额</span>
        </div>
        <div class="each_setting setting_middle" @click="toLink('bankCard')">
          <div class="each_setting_img"
               :style="{backgroundImage:`url(${require('../../assets/img/mine/icon_card@2x.png')}`}"></div>
          <span class="each_setting_title">银行卡</span>
        </div>
        <div class="each_setting setting_right">
          <div class="each_setting_img"
               :style="{backgroundImage:`url(${require('../../assets/img/mine/icon_share@2x.png')}`}"></div>
          <span class="each_setting_title">邀请好友</span>
        </div>
      </div>

    </div>

    <div class="centers">
      <mt-cell
        class="each_center"
        :title="item.title"
        is-link
        :to="item.link"
        v-for="item,key in center"
        :key="key"
      >
        <img class="center_icon" :src="item.icon">
      </mt-cell>
    </div>

  </div>
</template>
<script>
  import {clickAnim} from "../../utils/animate";

  export default {
    data() {
      return {
        banner_title: '富卡',

        banner_text: '智能信贷金融专家',
        center: [
          {
            title: '帮助中心',
            icon: require('../../assets/img/mine/icon_help@2x.png'),
            link: '/H5/helpCenter'
          },
          {
            title: '安全中心',
            icon: require('../../assets/img/mine/icon_security@2x.png')
          },
          {
            title: '在线客服',
            icon: require('../../assets/img/mine/icon_Customer@2x.png')
          },
          {
            title: '意见反馈',
            icon: require('../../assets/img/mine/icon_feedback@2x.png')
          },
          {
            title: '版本更新v2.0',
            icon: require('../../assets/img/mine/icon_update@2x.png')
          },
          {
            title: '关于我们',
            icon: require('../../assets/img/mine/icon_us@2x.png'),
            link: '/H5/aboutUs'
          },
        ]
      }
    },
    methods: {

      /**去登陆**/
      toLogin() {
        this.$router.push({
          name: 'getCode'
        });
      },
      toLink(name) {
        this.$router.push({
          name: name
        });
      }
    },
    computed: {
      /**1、接收state中isLogin的状态**/
      isLogin() {
        return this.$store.state.isLogin
      }
    },

    /**life cycle**/
    created(){

    },
    mounted() {
      clickAnim('login_button');
      clickAnim('setting_left');
      clickAnim('setting_middle');
      clickAnim('setting_right');
    },
    updated() {

    }
  }
</script>
<style scoped lang="less">
  .mine_container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0.98rem;
  }

  .header {
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .banner {
      width: 92%;
      display: flex;
      flex-direction: column;
      padding-top: 0.8rem;
      padding-bottom: 0.15rem;
      .banner_title {
        font-size: 0.5rem;
        color: #333848;
      }
      .banner_text {
        font-size: 0.28rem;
        color: #666667;
        margin-top: 0.2rem;
      }
    }

    .login {
      width: 92%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.45rem;
      .login_button {
        width: 3.60rem;
        height: 0.92rem;
        background: url("../../assets/img/mine/btn_Signin@2x.png") center no-repeat;
        background-size: 100% 0.92rem;
        color: white;
        font-size: 0.32rem;
        padding-top: 0.19rem;
        display: flex;
        justify-content: center;
        transition: all .2s ease;
        transform-origin: bottom;
      }
      .login_text {
        color: #979899;
        font-size: 0.24rem;
      }
    }

    .settings {
      width: 92%;
      display: flex;
      justify-content: space-between;
      padding: 0.6rem 0;
      .each_setting {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all .2s ease;
        transform-origin: bottom;
        .each_setting_img {
          width: 0.76rem;
          height: 0.63rem;
          background: url("../../assets/img/mine/icon_Quota@2x.png") center no-repeat;
          background-size: contain;
        }
        .each_setting_title {
          margin-top: 0.3rem;
          font-size: 0.3rem;
        }
      }
    }

  }

  .centers {
    width: 100%;
    background: white;
    margin-top: 0.2rem;
    .each_center {
      width: 100%;
      height: 1.2rem;
      padding-left: 0.12rem;
      display: flex;
      font-size: 0.34rem;
    }
    .center_icon {
      width: 0.4rem;
      height: 0.4rem;
      object-fit: contain;
      object-position: center center;
    }
  }
</style>
