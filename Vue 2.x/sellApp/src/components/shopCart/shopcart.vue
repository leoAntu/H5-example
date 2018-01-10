<template>
  <div class="shopcart">
    <div class="cart"  @click="toggleList">
      <div class="left">
        <div class="left-wrapper">
          <div class="left-cart">
            <div class="logo" :class="{'active': totalCount> 0}">
              <i class="icon-shopping_cart" :class="{'active': totalCount> 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="left-price" :class="{'active': totalPrice> 0}">¥{{totalPrice}}</div>
          <div class="des">另需要配送费¥{{deliveryPrice}}元</div>
        </div>
      </div>
      <div class="right" :class="{'enough':this.totalPrice >= this.minPrice}">
        <span class="default">{{payDes}}</span>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <!--执行两个不同方向的动画，必须要套两个div层-->
          <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball" ref="ball">
              <div class="inner innerHook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name="move">
      <div class="shop-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <h1 class="empty">清空</h1>
        </div>
        <div class="list-content">
          <ul class="content">
            <li v-for="good in goods" class="food">
              <span class="name">发顺丰</span>
              <div class="control-wrapper">
                <cartcontrol :food="good" @add="addFood"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </transition>
  </div>

</template>

<script>
  import cartcontrol from "../cartControl/carControl.vue"

  export default {
    name: 'a',
    components: {
      cartcontrol
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
        ],
        dropBalls: [],
        fold: true
      }
    },
    methods: {
      addFood(el){
        console.log(el)
      },
      toggleList(){

        console.log('togglelist')
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      drop(el){
        console.log( el)
        for (let i=0;i<this.balls.length;i++){
          let ball = this.balls[i];
          if (!ball.show){
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el){
        let count = this.balls.length;
        console.log(this.balls)
        while (count--) {
          let ball = this.balls[count];
          if (ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';

            el.style.webkitTransform = `translate3D(0,${y}px,0)`
            el.style.transform = `translate3D(0,${y}px,0)`
            console.log(el)

            let inner = el.getElementsByClassName('innerHook')[0];
            console.log(inner)
            inner.style.webkitTransform = `translate3D(${x}px,0,0)`
            inner.style.transform = `translate3D(${x}px,0,0)`
          }
        }
      },
      dropping(el,done){
//        触发浏览器重绘制小球（触发重绘的属性有多个），必须要执行
        let rf = el.offsetHeight;

//        做完动画，恢复到原始位置
        this.$nextTick(() => {
          el.style.display = '';
          el.style.webkitTransform = `translate3D(0,0,0)`
          el.style.transform = `translate3D(0,0,0)`
          let inner = el.getElementsByClassName('innerHook')[0];
          inner.style.webkitTransform = `translate3D(0,0,0)`
          inner.style.transform = `translate3D(0,0,0)`
//          必须要执行done,才能进入afterDrop（el）方法
          el.addEventListener('transitionend', done);
        })

      },
      afterDrop(el){
//        最后取出ball。恢复到默认状态
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    computed: {
      totalPrice(){
        let total = 0;
        this.goods.forEach((food)=>{
          total += food.price * food.count
        })
        console.log("total:" + total)

        return total
      },
      totalCount(){
        let count = 0;
        this.goods.forEach((food)=>{
          count += food.count
        })
        console.log(count)
        return count
      },
      payDes(){
        console.log("payDes:" +  this.totalPrice, this.minPrice)
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}元起送`
        } else {
          return "去结算"
        }
      },
      listShow(){
        console.log('SDfsfaaa')
        if (this.totalCount == 0) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        return show;
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
  .shopcart{
    position: fixed;
    z-index: 50;
    bottom: 0;
    height: 41px;
    width:100%;

  }
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


  .ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  }
  .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0,160,220);
    transition: all 0.4s linear
  }

  .shop-list{
    position: absolute;
    left: 0;
    top: 0;
    max-height: 217px;
    width: 100%;
    z-index: -1;
    transform: translate3d(0,-100%,0);
    overflow: hidden;
  }

  .list-header {
    height: 40px;
    padding: 0px 18px;
    font-size: 0;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }

  .list-header .title{
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 40px;
    float: left;

  }

  .list-header .empty{
    font-size: 12px;
    color: rgb(0,160,220);
    line-height: 40px;
    float: right;
  }


  .list-content{
    padding: 12px;
    position: relative;
    background-color: rgb(255,255,255);
  }
  .list-content .content{
    background-color: rgb(255,255,255);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    line-height: 48px;

  }
  .content .food{
    position: relative;
  }
  .control-wrapper{
    position: absolute;
    right: 0px;
    bottom: 6px;
    line-height: 0px;
    font-size: 0px;
  }

  .move-enter-active, .move-leave-active{
    transition: all 0.4s linear
  }
  .move-enter, .move-leave-active {
    transform: translate3d(0,0,0);
  }

</style>
