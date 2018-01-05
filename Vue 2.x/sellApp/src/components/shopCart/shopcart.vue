<template>
    <div class="cart">

      <div class="left">
        <div class="left-wrapper">
          <div class="left-cart">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="left-price">¥0</div>
          <div class="des">另需要配送费¥{{deliveryPrice}}元</div>
        </div>
      </div>
      <div class="right">
        <span class="default">¥{{minPrice}}元起送</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'a',
    components: {},
    data () {
      return {
        msg: '<span>hello</span>'
      }
    },
    methods: {},
    computed: {},
    watch: {},
    mounted () {

    },
    props: {
      deliveryPrice: 0,
      minPrice: 0
    }
  }
</script>

<style scoped>
    .cart {
        background-color: #141d27;
      display: flex;
    }
  .left{
    flex:1;
    font-size: 0;
    display: inline-block;
  }

  .left-wrapper{
    display: flex;
  }
  .left .left-cart{
    position: relative;
    width: 52px;
    height: 52px;
    top: -10px;
    background: #141d27;
    border-radius: 50%;
    margin-left: 18px;
    box-sizing: border-box;
    padding: 6px;
  }

  .left .logo{
    background: #2b343c;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;

  }

  .icon-shopping_cart{
    display: inline-block;
    font-size: 24px;
    line-height: 40px;
    color: rgba(255,255,255,0.4);
  }

  .left .left-price{
    margin-top: 12px;
    margin-left: 18px;
    box-sizing: border-box;

    color: rgba(255,255,255,0.4);
    font-size: 16px;
    display: inline-block;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
    height: 18px;
  }

  .left .des{
    margin-left: 12px;
    margin-right: 12px;
      font-size: 16px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 41px;
    /*width: 100px;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
  }

  .right{
    background: #2b343c;
    width: 105px;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 41px;
    text-align: center;
  }
  .default{

  }

</style>
