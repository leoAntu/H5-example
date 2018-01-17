<template>

  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div>
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" alt="">
            <div class="back" @click="comeBack">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <div class="name">{{food.name}}</div>
            <div class="extra">
              <span class="count">月售{{food.sellCount}}</span>
              <span>好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="nowPrice">¥{{food.price}}</span>
              <span class="oldPrice" v-if="food.oldPrice > 0">¥{{food.oldPrice}}</span>
            </div>
            <transition name="fade">
              <div class="joinCart" v-show="!food.count" @click="joinCart($event)">
                <span>加入购物车</span>
              </div>
            </transition>
            <div class="control-wrapper" v-show="food.count > 0">
              <cartcontrol :food="food" @add="addFood"></cartcontrol>
            </div>
          </div>
        </div>
        <div class="introduction">
          <h1 class="title">商品介绍</h1>
          <div class="des">
            <p>{{food.info}}</p>
          </div>
        </div>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <rating-select :desc="desc" :ratings="food.ratings" :onlyContent="onlyContent" :selectType="selectType" @select="select" @onlyClick="onlyClick"></rating-select>
          <div class="ratings-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="item in food.ratings" v-show="needShow(item)">
                <div class="container">
                  <div class="time">{{item.rateTime | format}}</div>

                  <div class="text">
                    <span :class="{'icon-thumb_down': item.rateType === 1,'icon-thumb_up' : item.rateType === 0}"></span>
                    <span class="info">{{item.text}}</span>
                  </div>
                  <div class="right-conten">
                    <span class="name">{{item.username}}</span>
                    <img :src="item.avatar" alt="" width="12" height="12">
                  </div>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>

          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import cartcontrol from "../cartControl/carControl.vue"
  import Vue from "vue"
  import ratingSelect from "../ratingSelect/ratingSelect.vue"
  import {formatDate} from "../../common/js/date.js"
  export default {
    name: '',
    components: {
      cartcontrol,
      ratingSelect
    },
    data () {
      return {
        showFlag: false,
        desc:{
          all: '全部',
          positive:'满意',
          negtive:"不满意"
        },
        onlyContent: false,
        selectType : 2
      }
    },
    methods: {
      needShow(item){
        if (this.onlyContent) {
          if (!item.text) {
            return false
          }
        }

        if(this.selectType === 0) {
          if (item.rateType != 0) {
            return false
          }
        }
        if(this.selectType === 1) {
          if (item.rateType != 1) {
            return false
          }
        }
        return true
      },
      onlyClick(){
        this.onlyContent = !this.onlyContent
        重新刷新scroll
        this.$nextTick(()=>{
          this.scroll.refresh()
        })
      },
      select(type){
        this.selectType = type;
                重新刷新scroll
        this.$nextTick(()=>{
          this.scroll.refresh()
        })
      },
      joinCart(event){
//        防止多次点击，betterscroll带的
        if (!event._constructed){
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food,'count',1)
      },
      addFood(el){
////        为了购物车小球动画优化，不卡顿，异步执行
        this.$nextTick(()=>{
          this.$emit('add', el);
        })
      },

      comeBack(){
        this.showFlag =false
      },
      show(){
        this.showFlag = true;
//        保证DOM被渲染
        this.$nextTick(()=>{
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.food,{
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    computed: {},
    watch: {},
    mounted () {

    },
    props: {
      food:{
        type: Object
      }
    },
    filters: {
      format(time){
        let date = new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm');

      }
    },
    created () {}
  }
</script>

<style scoped>
    .food {
      background-color: #f3f5f7;
      position: fixed;
      top: 0px;
      left: 0;
      bottom: 41px;
      z-index: 30;
      width: 100%;
      transform: translate3d(0,0,0);
      overflow: hidden;
    }
    .move-enter-active, .move-leave-active{
      transition: all 0.3s linear;
    }
    .move-enter, .move-leave-active {
      transform: translate3d(100%,0,0);

    }


    /*一种定位方法，防止图片没加载完出现抖动的情况，设置盒子高度为0，宽度100%，padding-top为100%,相当于高度和宽度一样*/
    .image-header{
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 100%;
  }
    .image-header img{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

  .back{
    position: absolute;
    top: 10px;
    left: 0;
  }
  .icon-arrow_lift{
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }

  .food-content{
    background-color: white;
  }

  .content {
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 0px;
    padding: 18px;
    position: relative;
  }

  .content .name{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
  }

  .extra{
    margin-top: 8px;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .extra .count{
    margin-right: 6px;
  }
  .price{
    margin-top: 18px;
  }
  .nowPrice{
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .oldPrice{
    margin-left: 5px;
    font-size: 10px;
    font-weight: 700;
    color: rgb(147,153,159);
    line-height: 24px;
  }
  .joinCart{
    width: 72px;
    height: 24px;
    border-radius: 24px;
    font-size: 10px;
    color: rgb(255,255,255);
    line-height: 24px;
    text-align: center;
    background-color: rgb(0,160,220);
    /*padding: 0 12px;*/
    position: absolute;
    right: 18px;
    bottom: 18px;
  }

    .control-wrapper{
      position: absolute;
      right: 18px;
      bottom: 12px;
    }

    .introduction{
    border-top: 1px solid rgba(7,17,27,0.1);
    padding: 18px;
    background-color: white;
    margin-top: 18px;
  }
  .introduction .title{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .introduction .des{
    padding: 6px 18px 0px 18px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(77,85,93);
    line-height: 24px;
  }
  .ratings{
    margin-top: 18px;
    border-top: 1px solid rgba(7,17,27,0.1);
    background-color: white;
  }
    .ratings .title{
      font-size: 14px;
      font-weight: 700;
      color: rgb(7,17,27);
      line-height: 14px;
      margin-top: 18px;
      margin-left: 18px;
    }

    .fade-enter-active, .fade-leave-active{
      transition: all 0.3s linear;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }

  .ratings-wrapper ul{
    margin: 0px 18px;
    font-size: 0;
  }

  .container{
    padding: 16px 0px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    position: relative;
  }
    .container .time{
      font-size: 10px;
      color: rgb(147,153,159);
      line-height: 12px;
    }
  .container .text{
    margin-top: 6px;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 16px;
  }

  .container .text .icon-thumb_up{
    font-size: 12px;
    color:rgb(0,160,220);
    line-height: 24px;
  }
    .container .text .icon-thumb_down{
      font-size: 12px;
      color:rgb(147,153,159);
      line-height: 24px;
    }
  .container .right-conten{
    position: absolute;
    top:18px;
    right: 0px;
  }
  .right-conten .name{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
    margin-right: 6px;
    vertical-align: middle;
  }
  .right-conten img{
    border-radius: 50%;
    vertical-align: middle;
  }

    .no-rating{
      padding: 16px 0;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }

</style>
