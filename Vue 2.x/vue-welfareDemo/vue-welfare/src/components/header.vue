<template>
    <div >
      <div class="page-cover" v-show="menuShow" @click="isShow"></div>
      <header class="header" :class="{'show': menuShow}" @click="isShow">
        <header class="bar bar-nav">
          <div class="pull-left">
            <span class="iconfont icon-fenlei"></span>
          </div>
          <div class="title">{{headerTitle}}</div>
          <div class="pull-right">
            <span class="iconfont icon-sousuo_sousuo"></span>
          </div>
        </header>
      </header>
      <v-menu :show="menuShow"></v-menu>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import vMenu from './menu.vue'
    export default {
        name: '',
        components: {
          vMenu
        },
        data() {
            return {
            }
        },
        methods: {
          isShow() {
            this.$store.commit('UPDATE_MENUSHOW');
          }
        },
        computed: {
          ...mapState({
            headerTitle: 'headerTitle',
            menuShow: 'menuShow'
          })
        },
        watch: {},
        mounted() {

        },
        props: {
            slides: {
                type: Array,
                default: []
            }
        },
        filters: {}
    }
</script>

<style scoped>
   .page-cover{
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: rgba(0,0,0,0.3);
     z-index: 7;
   }
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    min-height: 50px;
    font-size: 1.8px;
    line-height: 50px;
    background-color: #03a9f4;
    color: #ffffff;
    text-align: center;
    transition: all .3s ease;
    overflow: hidden;
  }
  .show {
    transform: translateX(250px);
  }
  .pull-left {
    padding: 0 10px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    float: left !important
  }

   .pull-right {
     padding: 0 10px;
     font-size: 16px;
     font-weight: 400;
     display: flex;
     float: right !important
   }

  .title {
    width: auto;
    position: absolute;
    right: 100px;
    left: 100px;
    font-size: 16px;
  }
</style>
