<template>
  <div class="nav">
    <div class="button loan" @click="switchPage('loan')">
      <div class="icon-loan" :style="{backgroundImage:`url(${iconLoan})`}"></div>
      <span class="title" :style="{color:titleLoan}">借款</span>
    </div>
    <div class="button bill" @click="switchPage('bill')">
      <div class="icon-bill" :style="{backgroundImage:`url(${iconBill})`}"></div>
      <span class="title" :style="{color:titleBill}">账单</span>
    </div>
    <div class="button mine" @click="switchPage('mine')">
      <div class="icon-mine" :style="{backgroundImage:`url(${iconMine})`}"></div>
      <span class="title" :style="{color:titleMine}">我的</span>
    </div>
  </div>
</template>

<script>
  import {clickAnim} from "../utils/animate";

  export default {
    name: "nav",
    data() {
      return {
        titleLoan: '#333848',
        titleBill: '#999999',
        titleMine: '#999999',

        iconLoan: require("../assets/img/nav/tabbar_Loan_up@2x.png"),
        iconBill: require("../assets/img/nav/tabbar_bill_down@2x.png"),
        iconMine: require("../assets/img/nav/tabbar_my_down@2x.png"),
      }
    },
    methods: {
      choseLoanStyle() {
        this.titleLoan = '#333848';
        this.titleBill = '#999999';
        this.titleMine = '#999999';
        this.iconLoan = require("../assets/img/nav/tabbar_Loan_up@2x.png");
        this.iconBill = require("../assets/img/nav/tabbar_bill_down@2x.png");
        this.iconMine = require("../assets/img/nav/tabbar_my_down@2x.png");
      },
      choseBillStyle() {
        this.titleLoan = '#999999';
        this.titleBill = '#333848';
        this.titleMine = '#999999';
        this.iconLoan = require("../assets/img/nav/tabbar_Loan_down@2x.png");
        this.iconBill = require("../assets/img/nav/tabbar_bill_up@2x.png");
        this.iconMine = require("../assets/img/nav/tabbar_my_down@2x.png");
      },
      choseMineStyle() {
        this.titleLoan = '#999999';
        this.titleBill = '#999999';
        this.titleMine = '#333848';
        this.iconLoan = require("../assets/img/nav/tabbar_Loan_down@2x.png");
        this.iconBill = require("../assets/img/nav/tabbar_bill_down@2x.png");
        this.iconMine = require("../assets/img/nav/tabbar_my_up@2x.png");
      },

      /**点击导航栏按钮改变页面**/
      switchPage(id) {
        switch (id) {
          case 'loan':
            this.$store.commit('updateActive', 'page-loan');
            this.choseLoanStyle();
            break;
          case 'bill':
            this.$store.commit('updateActive', 'page-bill');
            this.choseBillStyle();
            break;
          case 'mine':
            this.$store.commit('updateActive', 'page-mine');
            this.choseMineStyle();
            break;
        }
      },
    },
    computed: {
      /**接收state中active的状态**/
      active() {
        return this.$store.state.active
      }
    },
    created() {
      /**初始化时 根据state.active 渲染按钮样式**/
      switch (this.active) {
        case 'page-loan':
          this.choseLoanStyle();
          break;
        case 'page-bill':
          this.choseBillStyle();
          break;
        case 'page-mine':
          this.choseMineStyle();
          break;
      }
    },
    mounted() {
      clickAnim('loan');
      clickAnim('bill');
      clickAnim('mine');
    }
  }
</script>

<style scoped lang="less">

  .nav {
    width: 100%;
    border-top: 0.01rem solid #999;
    background-color: white;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
    .button {
      width: 2rem;
      padding-top: 0.1rem;
      padding-bottom: 0.05rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      transition: all .2s ease;
      transform-origin: bottom;

      .icon-loan {
        width: 0.46rem;
        height: 0.46rem;
        background: center center no-repeat;
        background-size: contain;

        transition: all .2s ease;
      }

      .icon-bill {
        width: 0.38rem;
        height: 0.45rem;
        background: center center no-repeat;
        background-size: contain;

        transition: all .2s ease;
      }

      .icon-mine {
        width: 0.37rem;
        height: 0.45rem;
        background: center center no-repeat;
        background-size: contain;

        transition: all .2s ease;
      }

      .title {
        margin-top: 0.1rem;

        transition: all .2s ease;
      }
    }
  }
</style>
