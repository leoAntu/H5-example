<template>
    <div class="goods">
      <div class="menu-wrapper" id="menu-wrapper" ref="menu">
        <ul >
          <li v-for="(item, index) in goods" :class="{'active': currentIndex === index}" @click="selectMenu(index,$event)" ref="menuList">
            <!--span之间换行会有空隙-->
            <span class="item">
              <span v-if="item.type > 0" class="icon" :class="myClass[item.type]"></span><span class="name">{{item.name}}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul v-if="goods">
          <li v-for="item in goods" class="food-list-hook foodList">
            <div class="title">
              <span >{{item.name}}</span>
            </div>

            <ul v-if="item.foods">
              <li v-for="(f,index) in item.foods" class="food" @click="selectFood(f,index,$event)">
                <div class="container">
                  <div class="foodIcon">
                    <img :src="f.icon">
                  </div>
                  <div class="content">
                    <h1 class="name">{{f.name}}</h1>
                    <p class="description">{{f.description}}</p>
                    <div class="sell">
                      <span>月售{{f.sellCount}}份</span><span class="rating">好评率{{f.rating}}%</span>
                    </div>
                    <div>
                      <span class="rmb">￥</span><span class="price">{{f.price}}</span>
                      <span v-if="f.oldPrice" class="oldPrice">¥{{f.oldPrice}}</span>
                    </div>
                    <div class="control-wrapper">
                      <cartcontrol :food="f" @add="addFood"></cartcontrol>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

          </li>
        </ul>
      </div>
      <shopcart class="shopcart" :goods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" ref="shopcart"></shopcart>
      <food :food="selectedFood" ref="food" @add="addFood"></food>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  import BScroll from "better-scroll"
  import shopcart from "../shopCart/shopcart.vue"
  import cartcontrol from "../cartControl/carControl.vue"
  import food from "../food/food.vue"

  export default {
    name: '',
    components: {
      shopcart,
      cartcontrol,
      food
    },
    data () {
      return {
        goods: [],
        myClass: ['decrease','discount','special','invoice','guarantee'],
        listHeight: [],
        scrollY: 0,
        selectedFood: null
      }
    },
    methods: {
      selectFood(food,index,event) {
        //        判断事件是不是better-scroll派生的，如果不是就阻止。主要为了原生的better-scroll冲突
        if (!event._constructed){
          return;
        }
        console.log(food)
        console.log(index)
        this.selectedFood = food
//        父组件可以直接调用子组件的方法和data
        this.$refs.food.show()
      },
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu,{
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foods,{
          probeType: 3,
          click: true
        })

        this.foodsScroll.on("scroll",(pos) => {
//          Math.round  取整数  Math.abs 取绝对值
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },

      calculateHeight() {
        const  foodList = document.getElementsByClassName("foodList")
        let height = 0;
        this.listHeight.push(height)

        for (let i = 0;  i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }
        console.log(this.listHeight)
      },

      selectMenu(index,event){
        //        判断事件是不是better-scroll派生的，如果不是就阻止。主要为了原生的better-scroll冲突
        if (!event._constructed){
          return;
        }
        const  foodList = document.getElementsByClassName("foodList")
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el,300)
      },

      followScroll(index) {
        const elList = this.$refs.menuList
        const el = elList[index];
        this.menuScroll.scrollToElement(el,300,0,-100)
      },

      addFood(el){
        this.drop(el)
      },

      drop(el){
//        为了购物车小球动画优化，不卡顿，异步执行
        this.$nextTick(()=>{
          this.$refs.shopcart.drop(el);
        })
      }

    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (height2 && (this.scrollY >= height1 && this.scrollY < height2)) {
            this.followScroll(i);

            return i;
          }
        }
        return 0;
      },

      selectFoods(){
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        })
        return foods
      }
    },
    watch: {},
    mounted () {

    },
    props: {
        seller: {
          type: Object
        }
    },
    filters: {},
    created () {

      this.$http.get('/apis/api/goods').then(response => {

        if (response.body.errno == ERR_OK) {
          this.goods = response.body.data
          console.log(this.goods)
//          相当于延迟加载
          setTimeout(()=>{
            this.initScroll();
            this.calculateHeight();
          },200);
//          偶尔会卡住，
//          this.$nextTick(() => {
//            this.initScroll();
//            this.calculateHeight();
//          })

        }
      }, response => {

        console.log(response)
      });
    }
  }
</script>

<style scoped>

  .active{
    color: black;
    font-size: 12px;
    background-color: white;
    font-weight: 700;
    /*遮住上面元素的边距*/
    position: relative;
    z-index: 10;
    margin-top: -1px;
  }

  .active .item{
    border-bottom: none !important;

  }
  .goods{

    position: absolute;
    top:177px;
    bottom: 41px;
    width: 100%;
    overflow: hidden;
    display: flex;


  }
  .menu-wrapper{
    width: 80px;
    background-color: #f3f5f7;
    color: rgb(147,153,159);
  }

  .menu-wrapper li{
    display: table;
    height: 54px;
    width: 56px;
    padding: 0 12px;
    font-size: 12px;
    line-height: 12px;
  }

  .menu-wrapper li .item{
    display: table-cell;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7,17,27,0.1);

  }


  .foods-wrapper{
    flex: 1;
    /*background-color: palegoldenrod;*/
  }
  .foods-wrapper .title{
    background-color: #f3f5f7;
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 26px;
    border-left: 2px solid #d9dde1;

  }

  .foods-wrapper .title span{
    padding-left: 14px;
  }

  .foods-wrapper .food{
    padding: 0px 18px;
  }

  .food {
    position: relative;
  }
  .foods-wrapper .food .container{
    display: flex;
    padding: 18px 0px;
    border-bottom: 1px solid rgba(7,17,27,0.1);

  }

  .foods-wrapper .food:last-child .container {
    border-bottom: none;
  }

  .foodIcon img{
    width: 57px;
    height: 57px;
    border-radius: 2px;
  }

  .foods-wrapper .content{
    margin-left: 10px;
  }

  .foods-wrapper .content .name{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-top: 2px;
    margin-bottom: 8px;
  }


  .foods-wrapper .content .description{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 8px;
  }

  .foods-wrapper .content .sell{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 8px;
  }

  .sell .rating{
    margin-left: 12px;
  }

  .foods-wrapper .rmb {
    font-size: 10px;
    color: red;
    font-weight: normal;
    line-height: 24px;

  }

  .foods-wrapper .price{
    font-size: 14px;
    color: red;
    font-weight: 700;
    line-height: 24px;
  }

  .oldPrice{
    font-size: 10px;
    color: rgb(147,153,159);
    font-weight: 700;
    line-height: 24px;
    text-decoration: line-through;
  }

  .control-wrapper{
    position: absolute;
    right: 18px;
    bottom: 12px;
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



</style>
