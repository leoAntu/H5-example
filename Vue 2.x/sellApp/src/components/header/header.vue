<template>
    <div class="header">
      <!--头部内容-->
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64"/>
        </div>

        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>

          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>

          <div v-if="seller.supports" class="support">
            <span class="icon" :class="myClass[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>

        <div class="support-count" @click="showDetail">
          <span class="count" v-if="seller.supports">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <!--公告部分-->
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
      </div>

      <!--头部背景图片-->
      <div class="backgroud">
        <img :src="seller.avatar" width="100%" height="100%"/>

      </div>

      <!--点击查看详情-->
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <v-star :size="48" :score="seller.score" class="star"></v-star>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li v-for="(item,index) in seller.supports" >
                <span class="icon" :class="myClass[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>

            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="supports">
              <span class="notice">{{seller.bulletin}}</span>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="colseDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable quotes,key-spacing,space-before-function-paren */

  import Star from "../star/star.vue"
  export default {
    name: '',
    components: {
      'v-star' : Star
    },
    data () {
      return {
        myClass: ['decrease','discount','special','invoice','guarantee'],
        detailShow: false
      }
    },
    methods: {
      showDetail(){
        this.detailShow = true;
      },
      colseDetail(){
        this.detailShow = false;
      }
    },
    computed: {},
    watch: {},
    mounted () {

    },
    props: {
      seller: {
        type: Object,
        default: null
      }
    },
    filters: {},
    created () {

    }
  }
</script>

<style scoped>
  .header {
    color: white;
    background-color: rgba(7,17,27,0.5);
    position: relative;
  }
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0px;
    position: relative;
  }

  .avatar{
    display: inline-block;
    font-size: 0px;

  }
  .avatar img{
    border-radius: 2px;
  }

  .content{
    position: relative;
    display: inline-block;
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin-left: 16px;
    top: -3px;

  }
  .title{
    margin-bottom: 8px;

  }
  .brand{
    /*span 为行元素必须要设置为块级元素才能设置高度和背景图片*/
    display: inline-block;
    width: 30px;
    height: 18px;
    background-image: url("brand@2x.png");
    background-size: 30px 18px;
    background-repeat: no-repeat;
    margin-left: 2px;
    vertical-align: top;
  }

  .name{
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    vertical-align: top;
    margin-left: 2px;
  }


  .description{
    margin-bottom: 10px;
  }

  .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    margin-left: 2px;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    vertical-align: top;

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

  .text{
    font-size: 10px;
    vertical-align: top;

  }

  .support-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    line-height: 24px;
    height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    font-size: 10px;
    display: inline-block;
    font-weight: 200;
    text-align: center;
  }
  .count{
    line-height: 12px;
  }
  .icon-keyboard_arrow_right{
    line-height: 12px;
    margin-left: 2px;
  }

  .bulletin-wrapper{
    height: 28px;
    padding: 0px 44px 0 12px;
    line-height: 28px;
    background-color: rgba(7,17,27,0.2);
    /*超出部分显示...设置*/
    white-space: nowrap;
    text-overflow: ellipsis;
    color: white;
    font-weight: 200;
    overflow: hidden;
    position: relative;
  }
  .bulletin-title{
    width: 22px;
    height: 12px;
    display: inline-block;
    background-size: 22px 12px;
    background-repeat: no-repeat;
    background-image: url("bulletin@2x.png");
    vertical-align: middle;

  }
  .bulletin-text{
    display: inline-block;
    vertical-align: middle;
    font-size: 10px;
    margin-left: 4px;
  }

  .bulletin-wrapper .icon-keyboard_arrow_right{
    font-size: 10px;
    position: absolute;
    right: 12px;
    top: 10px;
  }

  .backgroud{
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    /*添加模糊效果*/
    filter: blur(8px);
  }

  .detail{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7,17,27,0.8);
    top: 0;
    left: 0;
  }

  .detail-wrapper{
    height: 100%;
    width: 100%;
  }

  .detail-main{
      margin-top: 64px;
      padding-bottom: 64px;
  }

  .detail-main .name{
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    color: white;
    line-height: 16px;
    text-align: center;
  }

  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    font-size: 32px;
    margin: -64px auto 0px auto;
    /*clear: both;*/
  }

  .star{
    margin-top: 16px;
    text-align: center;
  }

  .detail-main .title{
    display: flex;
    margin: 28px auto 24px auto;
    width: 80%;
  }

  .detail-main .title .line{
    flex:1;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    position: relative;
    top: -8px;
  }

  .detail-main .title .text{
    padding-right: 12px;
    padding-left: 12px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }

   .detail-main .supports {
      width: 80%;
      margin: 0 auto;
      padding-right: 12px;
      padding-left:12px;
       box-sizing: border-box;
   }

  .detail-main .supports li{
    margin-bottom: 12px;
  }

  .detail-main .supports li:last-child{
    margin-bottom: 0px;
  }
  .detail-main .supports .icon{
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    vertical-align: middle;
  }

  .detail-main .supports .text{
    line-height: 10px;
    vertical-align: middle;
  }

  .detail-main .notice{
    font-size: 12px;
    font-weight: 200;
    color: white;
    line-height: 24px;
  }

/*媒体查询*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .brand{
      background-image: url("brand@3x.png");
    }
    .decrease{
      background-image: url("decrease_1@3x.png");
    }
    .discount{
      background-image: url("discount_1@3x.png");

    }
    .guarantee{
      background-image: url("guarantee_1@3x.png");

    }
    .invoice{
      background-image: url("invoice_1@3x.png");
    }
    .special{
      background-image: url("special_1@3x.png");
    }


  }

</style>
