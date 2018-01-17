<template>
  <div class="ratingsSelect">
    <div class="header">
        <div class="all" :class="{'active': selectType === 2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></div>

        <div class="recommend" :class="{'active': selectType === 0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></div>

        <div class="spit" :class="{'active': selectType === 1}" @click="select(1,$event)">{{desc.negtive}}<span class="count">{{negtives.length}}</span></div>
    </div>
    <div class="switch" @click="onlyClick($event)">
     <span class="icon-check_circle" :class="{'active': onlyContent}" ></span><span class="content">只看评论有内容的东西</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGTIVE = 1;
  const ALL = 2;
  export default {
    name: '',
    components: {},
    data () {
      return {
        msg: '<span>hello</span>'
      }
    },
    methods: {
      select(type,event){
        console.log('selet')
        //        防止多次点击，betterscroll带的
        if (!event._constructed){
          return;
        }
        this.$emit("select",type)
      },
      onlyClick(){
        console.log('onlyClick')

        //        防止多次点击，betterscroll带的
        if (!event._constructed){
          return;
        }
        this.$emit("onlyClick")
      }
    },
    computed: {
      positives(){
        let arr = []
        this.ratings.forEach((rating)=>{
          if (rating.rateType === POSITIVE){
            arr.push(rating)
          }
        })
        return arr;
      },
      negtives(){
        let arr = []
        this.ratings.forEach((rating)=>{
          if (rating.rateType === NEGTIVE){
            arr.push(rating)
          }
        })
        return arr;
      }
    },
    watch: {},
    mounted () {

    },
    props: {
      ratings: {
        type: Array,
        defult () {
          return []
        }
      },
      selectType:{
        type: Number,
        defult: ALL
      },
      onlyContent:{
        type: Boolean,
        defult: false
      },
      desc:{
        type: Object,
        defult(){
          return {
            all: '全部',
            positive:'满意',
            negtive:"不满意"
          }
        }
      },
    },
    filters: {},
    created () {}
  }
</script>

<style scoped>

  .ratingsSelect{
    border-bottom: 2px solid rgba(7,17,27,0.1);
  }
  .header{
    margin: 0px 18px;
    padding: 18px 0px;
    border-bottom: 1px solid rgba(7,17,27,0.1);

  }
  .header .all{
    display: inline-block;
    padding: 8px 12px;
    font-size: 12px;
    color: rgb(77,85,93);
    line-height: 16px;
    border-radius: 2px;
    background-color: rgb(0,160,220);
  }

  .header .recommend{
    display: inline-block;
    padding: 8px 12px;
    font-size: 12px;
    color: rgb(77,85,93);
    line-height: 16px;
    border-radius: 2px;
    background-color: rgba(0,160,220,0.2);
  }

  .header .spit{
    display: inline-block;
    padding: 8px 12px;
    font-size: 12px;
    color: rgb(77,85,93);
    line-height: 16px;
    border-radius: 2px;
    background-color: rgba(77,85,93,0.2);
  }
  .header .active{
    color: white;
  }
  .count{
    font-size: 8px !important;
    vertical-align: bottom;
  }

  .switch{
    padding: 12px 18px;
    line-height: 24px;
  }

  .switch .icon-check_circle{
    font-size: 24px;
    color: rgb(147,153,159);
    vertical-align: middle;
  }

  .switch .active{
    color: rgb(0,160,220);
  }
  .switch .content{
    font-size: 12px;
    color: rgb(147,153,159);
  }

</style>
