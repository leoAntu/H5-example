<template>
  <div class="menu">
    <div class="menu-list" :class="{'show': show}">
      <div class="menu-header">
        <img class="menu-avatar" src="https://avatars0.githubusercontent.com/u/11735533?v=3&amp;u=02b515725d0e52cdf5f02e2dbdc98c1de3ddbcc2&amp;s=400"
             alt="">
        <div class="menu-title">YangYi && liangxiaojuan</div>
      </div>
      <div class="menu-ul">
        <div v-for='menu in menus' @click="updateHeader(MENU_CONVERT[menu], menu)">
          <router-link class="icon-quanbu iconfont item border-1px" :to="menu" :class="{'active': MENU_CONVERT[menu] === headerTitle}">
            <div class="menu-icon">
              <i class="iconfont " :class="'icon-'+ menu"></i>
            </div>
            <span class="menu-text">{{MENU_CONVERT[menu]}}</span>
            <div class="menu-new" v-show="menu ==='day' && news>0">
              <span>5</span>
            </div>
          </router-link>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  const MENU_CONVERT = { 'welfare': '福利', 'day': '每日推荐', 'ios': 'IOS', android: 'Android', web: '前端' };

  export default {
        name: '',
        components: {},
        data() {
            return {
              MENU_CONVERT: MENU_CONVERT
            }
        },
        methods: {
          updateHeader(title, menu) {
            this.$store.commit('UPDATE_TITLE', title);
            this.$store.commit('UPDATE_MENUSHOW');
            if (menu === 'day') {
              this.$store.commit('UPDATE_NEWS');
            }
          }
        },
        computed: {
          ...mapState(['menus', 'news', 'headerTitle'])
        },
        watch: {},
        mounted() {
          console.log('121212211221211221');

          console.log(this.menus);
        },
        props: {
          show: {
                type: Boolean,
                default: false
            }
        },
        filters: {}
    }
</script>

<style scoped>
    .menu-list{
      position: fixed;
      top: 0;
      bottom: 0;
      left: -250px;
      width: 250px;
      z-index: 99;
      transition: all .3s ease;
      background-color: #22262a;
      color: #313131
    }
  .show {
    transform: translateX(250px);
  }
  .menu-header {
    width: 100%;
    height: 180px;
    background-color: #262d30;
  }
  .menu-avatar{
    width: 40%;
    height: auto;
    border-radius: 50%;
    margin: 20px 70px;
  }
    .menu-title{
      font-size: 14px;
      color: #ffffff;
      line-height: 28px;
      font-weight: 500;
      text-align: center;
    }

    .item {
      display: block;
      font-size: 14px;
      padding: 10px 13px;
      text-align: left;
      line-height: 15px;
      color: #a6adb3;
      font-weight: 700;
      border-bottom: 1px solid white;
    }
  .menu-icon {
    display: inline-block;
  }
    .menu-new{
      display: inline-block;
      color: #a6adb3;
    }
  .active{
    color: #01aef3;
  }
</style>
