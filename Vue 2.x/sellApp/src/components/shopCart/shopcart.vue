<template>
    <div class="cart">

      <div class="left">
        <div class="left-wrapper">
          <div class="left-cart">
            <div class="logo" :class="{'active': totalCount> 0}">
              <i class="icon-shopping_cart" :class="{'active': totalCount> 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="left-price" :class="{'active': totalPrice> 0}">¥0</div>
          <div class="des">另需要配送费¥{{deliveryPrice}}元</div>
        </div>
      </div>
      <div class="right" :class="{'enough':this.totalPrice >= this.minPrice}">
        <span class="default">{{payDes}}</span>
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
    computed: {
      totalPrice(){
        let total = 0;
        this.goods.forEach((food)=>{
          total += food.price
        })
        return total
      },
      totalCount(){
        let count = 0;
        this.goods.forEach((food)=>{
          count += food.count
        })
        return count
      },
      payDes(){
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}元起送`
        } else {
          return "去结算"
        }
      }
    },
    watch: {},
    mounted () {

    },
    props: {
      deliveryPrice: 0,
      minPrice: 0,
      goods:{
        type: Array,
        default() {
          return []
        }
      }
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
    .left .logo.active{
      background-color: rgb(0,160,220);
    }

  .icon-shopping_cart{
    display: inline-block;
    font-size: 24px;
    line-height: 40px;
    color: rgba(255,255,255,0.4);
  }
    .icon-shopping_cart.active{
      color: white;
    }

  .left .num{
    display: inline-block;
    position: relative;
    top: -48px;
    left: 24px;
    width: 24px;
    height: 16px;
    font-size: 9px;
    font-weight: 700;
    color: rgb(255,255,255);
    box-shadow: 0px 4px 8px 0 rgba(0,0,0,0.4);
    line-height: 16px;
    background-color: rgb(240,20,20);
    border-radius: 16px;
    text-align: center;

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
    .left .left-price.active{
      color: white;
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
  .right.enough{
    background-color: #00b43c;
    color: white;
  }

</style>
