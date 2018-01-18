<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="seller-header">
          <div class="header-top">
            <h1 class="name">{{seller.name}}</h1>
            <div class="header-wrapper">
              <star :size="36" :score="seller.score" class="star"></star>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="sellCount">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="header-bottom">
            <div class="left">
              <div class="title">起送价</div>
              <div class="number">{{seller.minPrice}}<span>元</span></div>
            </div>
            <div class="middle">
              <div class="title">商家配送</div>
              <div class="number">{{seller.deliveryPrice}}<span>元</span></div>
            </div>
            <div class="right">
              <div class="title">平均配送时间</div>
              <div class="number">{{seller.deliveryTime}}<span>分钟</span></div>
            </div>
          </div>
          <div class="favorite" @click="toggleFavorite($event)">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <div class="split"></div>
        <div class="seller-board">
          <div class="header">
            <h1 class="title">公告与活动</h1>
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li v-for="(item,index) in seller.supports" >
              <span class="icon" :class="myClass[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="split"></div>
        <div class="live-action">
          <h1 class="title">商家实景</h1>
          <div class="pics" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" alt="" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <div class="split"></div>

        <div class="info">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
            <li class="info-item" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import star from "../star/star.vue"
  import { saveToLocal, loadFromLocal } from "../../common/js/store"
  export default {
    name: '',
    components: {
      star
    },
    data () {
      return {
        myClass: ['decrease','discount','special','invoice','guarantee'],
        favorite : (()=>{
          return loadFromLocal(this.seller.id,"favorite",false)
        })()
      }
    },
    methods: {
      toggleFavorite(event){
        if (!event._constructed){
          return
        }
        this.favorite = !this.favorite
        console.log(this.seller.id)
        saveToLocal(this.seller.id,'favorite',this.favorite)
      }
    },
    computed: {
      favoriteText(){
        return this.favorite ? "已收藏" : "收藏"
      }
    },
    watch: {
      'seller'(){

      }
    },
    mounted () {
      this.$nextTick(()=>{
        if (!this.scroll){
          this.scroll = new BScroll(this.$refs.seller,{
            click: true
          })
        } else  {
          this.scroll.refresh()
        }

        if (this.seller.pics){
//          要重新计算ul的宽度，才能滚动
          let picW = 120;
          let margin = 6;
          let width = (picW + margin) * this.seller.pics.length
          this.$refs.picList.style.width = width + 'px';
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
              click: true
            });
          } else {
            this.picScroll.refresh();
          }
        }
      })
    },
    props: {
      seller:{
        type: Object,
        default(){
          return null
        }
      }
    },
    filters: {},
    created () {
    }
  }
</script>

<style scoped>
  .seller{
    position: absolute;
    overflow: hidden;
    top: 177px;
    bottom: 0px;
    width: 100%;
  }
  .seller-content{
    width: 100%;
    /*height: 1000px;*/
    background-color: white;
  }
  .seller-header{
    font-size: 0px;
  }
  .header-top{
    margin: 0px 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding: 18px 0px;
  }
  .header-top .name{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .header-wrapper{
    margin-top: 8px;
  }
  .header-top .star{
    display: inline-block;
    vertical-align: middle;
  }
  .header-top .ratingCount{
    display: inline-block;
    font-size: 10px;
    color: rgb(77,85,93);
    /*line-height: 18px;*/
    margin-left: 8px;
    vertical-align: middle;
  }
  .header-top .sellCount{
    display: inline-block;
    font-size: 10px;
    color: rgb(77,85,93);
    /*line-height: 18px;*/
    margin-left: 12px;
    vertical-align: middle;
  }
  .header-bottom{
    padding: 18px 0px;
    display: flex;
    font-size: 10px;
    text-align: center;
  }
  .header-bottom .left{
      flex: 1;
    border-right: 1px solid rgba(7,17,27,0.1);
  }

  .header-bottom .title{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .header-bottom .middle{
    flex: 1;
    border-right: 1px solid rgba(7,17,27,0.1);

  }
  .header-bottom .right{
    flex: 1;
  }
  .header-bottom .number{
    margin-top: 8px;
    font-size: 24px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .header-bottom span{
    font-size: 10px;
    font-weight: normal;
    color: rgb(7,17,27);
    line-height: 10px;
  }
  .split{
    width: 100%;
    height: 18px;
    background-color: #f3f5f7;
    border-bottom: 2px solid rgba(7,17,27,0.1);
    border-top: 2px solid rgba(7,17,27,0.1);
  }

  .seller-board{
    margin: 0px 18px;
  }

  .seller-board .header{
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }

  .seller-board .header .title{
    margin-top: 18px;
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
  }

  .seller-board .header .content{
    padding: 8px 12px 16px 12px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(240,20,20);
    line-height: 24px;
    vertical-align: middle;
  }

  .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    margin-left: 2px;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    vertical-align: middle;

  }

  .decrease{
    background-image: url("decrease_1@2x.png");
  }

  .discount{
    background-image: url("discount_1@2x.png");
  }

  .guarantee{
    background-image: url("guarantee_1@2x.png");
  }

  .invoice{
    background-image: url("invoice_1@2x.png");
  }
  .special{
    background-image: url("special_1@2x.png");
  }
  .supports li{
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding: 16px 12px 16px 12px;
  }
  .supports .text{
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
    vertical-align: middle;
  }
  .live-action{
    padding: 18px 0px 18px 18px;
  }
  .live-action .title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
  }

  .pics{
    margin-top: 12px;
    width: 100%;
    overflow: hidden;
    /*不被换行*/
    white-space: nowrap;
  }

  .pic-list {
    font-size: 0;

  }
  .pic-item{
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }

  .info{
    padding: 18px 18px 0 18px;
    color: rgb(7,17,27);
  }
  .info .title{
    line-height: 14px;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
    font-size: 14px;
  }

  .info-item{
    padding: 16px 12px;
    line-height: 16px;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
    font-size: 12px
  }
  .info-item:last-child{
    border-bottom: none;
  }

  .favorite{
    position: absolute;
    width: 50px;
    right: 11px;
    top: 18px;
    text-align: center;

  }
  .icon-favorite{
    display: block;
    margin-bottom: 4px;
    line-height: 24px;
    font-size: 24px;
    color: #d4d6d9 ;
  }

  .favorite .active{
    color: rgb(240, 20, 20)
  }

  .favorite .text{
    line-height: 10px;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }


</style>
