<template>
    <div class="cart-control">
      <div class="decrese icon-remove_circle_outline" v-show="food.count>0"></div>
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

        console.log('%%%%%%' + this.food.count);

//        if (this.food.count == 0) {
//          console.log('%%%%%%' + this.food.count);
////          props引入的变量不会监听，需要全部局set，
//          Vue.set(this.food,"count",1)
//          return;
//        }
        this.food.count += 1;
      }
    },
    computed: {},
    watch: {
      food: function () {
        console.log(food.count)
      }
    },
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

  .decrese, .add{
    display: inline-block;
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
    vertical-align: middle;
  }

  .number{
    display: inline-block;
    font-size: 10px;
    color: rgb(147,153,159);
    margin-right: 12px;
    margin-left: 12px;
    vertical-align: middle;
  }

</style>
