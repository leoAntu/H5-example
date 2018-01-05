<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
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
          <li v-for="item in goods" class="food-list-hook">
            <div class="title">
              <span >{{item.name}}</span>
            </div>

            <ul v-if="item.foods">
              <li v-for="food in item.foods" class="food">
                <div class="container">
                  <div class="foodIcon">
                    <img :src="food.icon">
                  </div>
                  <div class="content">
                    <h1 class="name">{{food.name}}</h1>
                    <p class="description">{{food.description}}</p>
                    <div class="sell">
                      <span>月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div>
                      <span class="rmb">￥</span><span class="price">{{food.price}}</span>
                      <span v-if="food.oldPrice" class="oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

          </li>
        </ul>
      </div>
      <shopcart class="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  import BScroll from "better-scroll"
  import shopcart from "../shopCart/shopcart.vue"
  export default {
    name: '',
    components: {
      shopcart
    },
    data () {
      return {
        goods: [],
        myClass: ['decrease','discount','special','invoice','guarantee'],
        listHeight: [],
        scrollY: 0
      }
    },
    methods: {
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu,{
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foods,{
          probeType: 3
        })

        this.foodsScroll.on("scroll",(pos) => {
//          Math.round  取整数  Math.abs 取绝对值
          this.scrollY = Math.abs(Math.round(pos.y))
        })
        this.calculateHeight();
      },

      calculateHeight() {
        const  foodList = document.getElementsByClassName("food-list-hook")
        let height = 0;
        this.listHeight.push(height)

        for (let i = 0;  i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }

      },

      selectMenu(index,event){
        if (!event._constructed){
          return;
        }

        const  foodList = document.getElementsByClassName("food-list-hook")

        let el = foodList[index]
        this.foodsScroll.scrollToElement(el,300)
      },

      followScroll(index) {
        const elList = this.$refs.menuList
        const el = elList[index];
        this.menuScroll.scrollToElement(el,300,0,-100)
      }


    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (height2 && (this.scrollY >= height1 && this.scrollY < height2)) {
            console.log(i)
            this.followScroll(i);

            return i;
          }
        }
        return 0;
      }
    },
    watch: {},
    mounted () {

    },
    props: {
        seller: null
    },
    filters: {},
    created () {

      this.$http.get('/apis/api/goods').then(response => {

        if (response.body.errno == ERR_OK) {
          this.goods = response.body.data
          console.log(this.goods)
          this.$nextTick(() => {
            this.initScroll();
          })
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


  .shopcart{
    position: fixed;
    z-index: 50;
    bottom: 0;
    height: 41px;
    width:100%;

  }
</style>
