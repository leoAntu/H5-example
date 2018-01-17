<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overView">
          <div class="left">
            <div class="score">{{seller.score}}</div>
            <div class="const"><span>综合评分</span></div>
            <div class="des"><span>高于周边商家{{seller.rankRate}}%</span></div>
          </div>
          <div class="right">
            <div class="service">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore" class="star"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="good">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore" class="star"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="time">
              <span class="title">送达时间</span>
              <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="ratings-wrapper">
          <rating-select :desc="desc" :ratings="ratings" :onlyContent="onlyContent" :selectType="selectType" @select="select" @onlyClick="onlyClick"></rating-select>
          <div class="content">
            <ul v-show="ratings && ratings.length">
              <li v-for="item in ratings" v-show="needShow(item)">
                <div class="container">
                    <div class="container-left">
                      <img :src="item.avatar" width="28" height="28"/>
                    </div>
                    <div class="container-right">
                      <div class="name"><span>{{item.username}}</span></div>
                      <div class="score">
                        <star :size="24" :score="item.score" class="star"></star>
                        <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                      </div>
                      <div class="info">
                        <span>{{item.text}}</span>
                      </div>
                      <div class="des" v-show="item.recommend && item.recommend.length">
                        <i :class="{'icon-thumb_up':item.rateType === 0,'icon-thumb_down': item.rateType === 1}" class="icon"></i>
                        <span v-for="recommend in item.recommend" class="recommend">{{recommend}}</span>
                      </div>
                      <div class="time"><span>{{item.rateTime | format}}</span></div>

                    </div>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import star from "../star/star.vue"
  import ratingSelect from "../ratingSelect/ratingSelect.vue"
  import {formatDate} from "../../common/js/date.js"

  const ERR_OK = 0;
  export default {
    name: '',
    components: {
      star,
      ratingSelect
    },
    data () {
      return {
        ratings: [],
        onlyContent: false,
        selectType:2,
        desc:{
          all: '全部',
          positive:'满意',
          negtive:"不满意"
        }
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
    },
    computed: {},
    watch: {},
    mounted () {

    },
    props: {
      seller:{
        type: Object,
        default(){
          return null
        }
      }
    },
    filters: {
      format(time){
        let date = new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm');

      }
    },
    created () {
      this.$http.get('/apis/api/ratings').then(response => {

        if (response.body.errno == ERR_OK) {
          this.ratings = response.body.data
          console.log(this.ratings)
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings,{
                click: true
              })
            } else  {
              this.scroll.refresh()
            }
          })

        }
      }, response => {

        console.log(response)
      });
    }
  }
</script>

<style scoped>
    .ratings{

      position: absolute;
      top:177px;
      bottom: 0px;
      width: 100%;
      overflow: hidden;
    }

  .overView{
    padding: 18px 0px;
    display: flex;
  }
  .overView .left{
    width: 137px;
    border-right: 1px solid rgba(7,17,27,0.1);
    font-size: 0px;
    text-align: center;
  }

  .overView .left .score{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
  }
    .overView .left .const{
      font-size: 12px;
      color: rgb(7,17,27);
      line-height: 12px;
      margin-top: 6px;
    }
    .overView .left .des{
      font-size: 10px;
      color: rgba(7,17,27,0.6);
      line-height: 10px;
      padding-top: 8px;
      padding-bottom: 6px;
    }
  .overView .right{
    flex: 1;
    padding: 0px 24px;
  }
    .overView .right .title{
      font-size: 12px;
      color: rgb(7,17,27);
      line-height: 18px;
    }
    .overView .right .score{
      font-size: 12px;
      color: rgb(255,153,0);
      line-height: 18px;
    }
    .overView .right .good{
      margin-top: 8px;
    }

    .overView .right .time{
      margin-top: 8px;
    }

    .deliveryTime{
      font-size: 12px;
      color: rgb(147,153,159);
      line-height: 18px;
    }

  .star{
    display: inline-block;
    vertical-align: middle;
  }

  .split{
    width: 100%;
    height: 18px;
    background-color: #f3f5f7;
    border-bottom: 2px solid rgba(7,17,27,0.1);
    border-top: 2px solid rgba(7,17,27,0.1);

  }

    .no-rating{
      padding: 16px 0;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
  .content{
    margin: 0px 18px;
  }
  .container{
    padding: 18px 0px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    display: flex;
  }

    .container-left{
      width: 28px;
      border-radius: 50%;
    }
    .container-left img{
      border-radius: 50%;
    }
  .container-right{
    flex: 1;
    margin-left: 12px;
    position: relative;
  }
  .container-right .name{
    font-size: 10px;
    font-weight: 200;
    color:rgb(7,17,27);
    line-height: 12px;
  }
    .container-right .score{
      margin-top: 4px;
    }
    .container-right .score .deliveryTime{
      font-size: 10px;
      font-weight: 200;
      color:rgb(147,153,159);
      line-height: 12px;
    }
    .container-right .info{
      margin-top: 8px;
      font-size: 12px;
      color:rgb(7,17,27);
      line-height: 18px;

    }

    .container-right .des .icon{
      margin-top: 8px;
    }
    .container-right .recommend{
      display: inline-block;
      padding: 0px 6px;
      border: 1px solid rgba(7,17,27,0.1);
      font-size: 9px;
      color: rgb(147,153,159);
      line-height: 16px;
      margin-right: 8px;
      margin-top: 8px;
      border-radius: 1px;
    }
    .container-right .time{
      font-size: 10px;
      font-weight: 200;
      color: rgb(147,152,159);
      line-height: 12px;
      position: absolute;
      right: 0px;
      top: 0px;
    }

    .icon-thumb_up{
      font-size: 12px;
      color:rgb(0,160,220);
      line-height: 16px;
    }
   .icon-thumb_down{
      font-size: 12px;
      color:rgb(147,153,159);
      line-height: 16px;
    }
</style>
