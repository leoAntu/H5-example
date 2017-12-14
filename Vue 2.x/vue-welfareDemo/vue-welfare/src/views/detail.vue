<template>
  <transition name="fade">
    <div v-show="showFlag" class="details">
      <div>
        <header class="header">
          <header class="bar bar-nav" @click="hide">
            <div class="pull-left">
              <span class="iconfont icon-left"></span>
            </div>
            <div class="title">{{time | formatDate}}</div>
          </header>
        </header>
        <v-day :data="detailsData" ref="day"></v-day>
      </div>
    </div>
  </transition>
</template>

<script >
  import { formatDate } from '../common/js/date';
  import VDay from './day.vue'
  export default {
        name: '',
        components: {
          VDay
        },
        data() {
            return {
              showFlag: false
            }
        },
        methods: {
          hide(){
            this.showFlag = false;
          },
          show() {
            console.log('4545454');

            this.showFlag = true;
//            this.$nextTick(() => {
//              if (!this.scroll) {
//                this.scroll = new BScroll(this.$el, {
//                  click: true
//                });
//              } else {
//                this.scroll.refresh();
//              }
//              this.$refs.day.clearStyle();
//            });
          }
        },
        computed: {},
        watch: {},
        mounted() {

        },
        props: {
          time: {
            type: String
          },
          detailsData: {
            type: Object
          }
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
          }
        }
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all 0.2s linear ;
    transform: translate3d(0, 0, 0)
                        }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0)
  }
  .details{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    background-color: #ffffff
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

  .pull-left {
    padding: 0 10px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    float: left !important
  }

  .title {
    width: auto;
    position: absolute;
    right: 100px;
    left: 100px;
    font-size: 16px;
  }
</style>
