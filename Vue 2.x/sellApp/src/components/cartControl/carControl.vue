<template>
    <div class="cart-control">
      <transition name="move">
        <div class="decrese" v-show="food.count>0" @click="decreaseCart($event)">
          <span class="inner inner_move icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="number" v-show="food.count>0">{{food.count}}</div>

      <div class="add icon-add_circle" @click="addFood($event)"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: '',
    components: {},
    data () {
      return {
      }
    },
    methods: {
      addFood(event){
        if (!event. _constructed) {
          return;
        }

        console.log(event);

        if (!this.food.count) {
//          props引入的变量不会监听，需要全部局set，
          Vue.set(this.food,"count",1)
        } else {
          this.food.count += 1;
        }
        this.$emit('add', event.target);
      },
      decreaseCart(event){
        if (!event. _constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count -= 1;
        } else {
          this.food.count = 0;
        }
      }
    },
    computed: {},
    mounted () {
    },
    props: {
      food:{
        type: Object,
        defult(){
          return null
        }
      }
    }
  }
</script>

<style scoped>
  .cart-control{
      font-size: 0px;
  }

  .decrese{
    display: inline-block;
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0)
  }

  .inner{
    display: inline-block;
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
    vertical-align: middle;
    transition: all 0.4s linear;
    transform: rotate(0)
  }
  .add{
    display: inline-block;
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
    vertical-align: middle;
    padding: 6px;
  }

  .number{
    display: inline-block;
    font-size: 10px;
    color: rgb(147,153,159);
    /*margin-right: 12px;*/
    /*margin-left: 12px;*/
    vertical-align: middle;
  }

    .move-enter-active, .move-leave-active{
      transition: all 0.4s linear
    }
    .move-enter, .move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
    }

    .move-enter, .move-leave-active .inner_move{
      transform: rotate(180deg)

    }






</style>
