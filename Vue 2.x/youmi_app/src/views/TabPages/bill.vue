<template>
  <div class="bill_container">
    <mt-loadmore
      class="loadmore"
      style="padding-bottom: calc(0.98rem + env(safe-area-inset-bottom));"
      :top-method="loadTop"
      ref="loadmore"
      :distanceIndex="3"
      :topDistance="70"
      :maxDistance="100"
      @top-status-change="handleTopChange">
      <!--下拉刷新展示内容-->
      <div slot="top" class="mint-loadmore-top">
        <span class="loadmore-text" v-show="topStatus === 'pull'">
          <img src="../../assets/img/loan/coin.png"/>
        </span>
        <span class="loadmore-text" v-show="topStatus === 'drop'">
          <img src="../../assets/img/loan/horseHead.png"/>
        </span>
        <span class="loadmore-text" v-show="topStatus === 'loading'">
          <img src="../../assets/img/loan/loading.gif"/>
        </span>
      </div>


      <div class="header">
        <span>我的账单</span>
      </div>

      <!--弹出登录框模式-->
      <div v-if="!isLogin">
        <div class="card">
          <img class="card_default" src="../../assets/img/bill/white_bar_default@2x.png"/>
        </div>

        <mt-cell
          class="item"
          style="width: 100%"
          v-for="item,key in 3"
          is-link
          :key="key"
        >
          <div slot="title" class="item_left">
            <img class="item_default" src="../../assets/img/bill/item_default@2x.png"/>
          </div>
        </mt-cell>

      </div>

      <div v-if="isLogin">

        <!--有其中一种账单-->
        <div v-if="currentLoanLog||historyList">

          <!--当前订单--状态-->

          <!--有当前订单-->
          <div v-if="currentLoanLog" class="card">
            <div class="card_left">
              <div class="card_left_up">

                <span class="amount">{{currentLoanLog.amount}}元</span>

              </div>

              <div class="card_left_down">


                <!--审核中图标-->
                <img v-if="currentLoanLog.state==='10'||currentLoanLog.state==='22'"
                     src="../../assets/img/bill/zd_icon_shenhe.png"
                     style="width: 0.3rem;height: 0.3rem"/>
                <!--放款中图标-->
                <img
                  v-if="currentLoanLog.state==='20'||currentLoanLog.state==='26'||currentLoanLog.state==='29'||currentLoanLog.state==='31'"
                  src="../../assets/img/bill/zd_icon_fangkuan.png"
                  style="width: 0.36rem;height: 0.28rem"/>
                <!--待还款图标-->
                <img v-if="currentLoanLog.state==='30'"
                     src="../../assets/img/bill/zd_icon_dhk.png"
                     style="width: 0.2rem;height: 0.28rem"/>
                <!--还款中图标-->
                <img v-if="currentLoanLog.state==='35'"
                     src="../../assets/img/bill/zd_icon_huankuan.png"
                     style="width: 0.35rem;height: 0.28rem"/>
                <!--已逾期图标-->
                <img v-if="currentLoanLog.state==='50'"
                     src="../../assets/img/bill/zd_icon_yq.png"
                     style="width: 0.32rem;height: 0.27rem"/>


                <span class="stateStr" :style="{color:currentLoanLog.state==='50'?'#fe5a74':'#333848'}">{{currentLoanLog.stateStr}}</span>
                <span class="vertical_line"></span>
                <span class="timeStamp">{{currentLoanLog.creditTimeStr}}</span>

              </div>
            </div>
            <div class="card_right">
              <img v-if="currentLoanLog.state!=='30'&&currentLoanLog.state!=='50'" class="next"
                   src="../../assets/img/bill/zd_btn_next.png"/>
              <span v-if="currentLoanLog.state==='30'||currentLoanLog.state==='50'" class="payback">还款</span>
            </div>
          </div>
          <!--无当前订单-->
          <div v-if="!currentLoanLog" class="noCurrentBill">
            <span>您还没有可操作账单，快去<u>借款吧</u>></span>
          </div>

          <!--历史订单--状态-->

          <!--有历史订单-->
          <div v-if="historyList" class="historyList">

            <div class="historyTitle">
              <img src="../../assets/img/bill/zd_line_left.png" style="width: 0.97rem;height: 0.03rem"/>
              <span>已完成订单</span>
              <img src="../../assets/img/bill/zd_line_right.png" style="width: 0.97rem;height: 0.03rem"/>
            </div>

            <mt-cell
              class="item"
              style="width: 100%"
              v-for="item,key in historyList"
              is-link
              :key="key"
            >
              <div slot="title" class="item_left">
                <div class="item_left_up">
                  <span class="amount">{{item.amount}}元</span>
                </div>
                <div class="item_left_down">
                  <span class="stateStr" style="margin-left: 0">{{item.stateStr}}</span>
                  <span class="vertical_line"></span>
                  <span class="timeStamp">{{item.creditTimeStr}}</span>
                </div>
              </div>
            </mt-cell>

          </div>
          <!--无历史订单-->
          <div v-if="!historyList" class="noHistoryBill">
            <span>没有其他账单了哦</span>
          </div>

        </div>

        <!--没有任何账单-->
        <div v-if="!currentLoanLog&&!historyList" class="noAnyBill">
          <span>您还没有任何历史账单，快去<u>借款吧</u>></span>
          <img class="noAnyBill_img" src="../../assets/img/bill/zd_icon_none@2x.png"/>
        </div>

      </div>


    </mt-loadmore>

    <!--/**loginpop**/-->
    <mt-popup class="loginModal" style="margin-bottom: calc(0.98rem + env(safe-area-inset-bottom));" :modal="true" :closeOnClickModal="false" :value="!isLogin" position="bottom">
      <img class="icon_loginpop" src="../../assets/img/bill/zd_icon_loginpop.png"/>
      <img class="word_loginpop" src="../../assets/img/bill/zd_word_loginpop.png"/>
      <img @click="toLogin" class="button_loginpop" src="../../assets/img/bill/zd_button_loginpop.png"/>
    </mt-popup>
  </div>
</template>
<script>
  import {clickAnim} from "../../utils/animate";
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        topStatus: '',
        currentLoanLog: {},
        historyList: [],

        page: {
          "total": 20,
          "pages": 10,
          "current": 10,
          "pageSize": 2
        }
      }
    },
    methods: {
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },

      /**去登陆**/
      toLogin() {
        // this.$router.push({
        //   name: 'getCode'
        // });

        this.$store.commit('updateIsLogin', true)
      }
    },
    computed: {
      /**1、接收state中isLogin的状态**/
      isLogin() {
        return this.$store.state.isLogin
      }
    },

    /**生命周期**/
    created() {
      /**
       * state
       * currentLoanLog
       * 审核中 10 22
       * 放款中 20 26 31 29
       * 待还款 30
       * 还款中 35
       * 已逾期 50
       *
       * historyList
       * 未通过 21 27
       * 已结清 40 41
       * **/
      this.currentLoanLog = {
        "id": 1703,
        "amount": 630.81,
        "createTime": "2017-11-22 18:37:55",
        "state": "50",
        "stateStr": "已逾期",
        "penaltyAmount": 0,
        "penaltyDay": 0,
        "agentAmount": 0,
        "repayAmount": 0,
        "creditTimeStr": "2017.11.22"
      };

      // this.currentLoanLog = null;

      this.historyList = [
        {
          "id": 1687,
          "amount": 1203.58,
          "createTime": "2017-11-22 15:46:57",
          "state": "40",
          "stateStr": "已结清",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        },
        {
          "id": 1677,
          "amount": 328.21,
          "createTime": "2017-11-22 14:06:41",
          "state": "40",
          "stateStr": "未通过",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        },
        {
          "id": 1677,
          "amount": 328.21,
          "createTime": "2017-11-22 14:06:41",
          "state": "40",
          "stateStr": "未通过",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        },
        {
          "id": 1677,
          "amount": 328.21,
          "createTime": "2017-11-22 14:06:41",
          "state": "40",
          "stateStr": "未通过",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        },
        {
          "id": 1677,
          "amount": 328.21,
          "createTime": "2017-11-22 14:06:41",
          "state": "40",
          "stateStr": "未通过",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        },
        {
          "id": 1677,
          "amount": 328.21,
          "createTime": "2017-11-22 14:06:41",
          "state": "40",
          "stateStr": "未通过",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        },
        {
          "id": 1677,
          "amount": 328.21,
          "createTime": "2017-11-22 14:06:41",
          "state": "40",
          "stateStr": "未通过",
          "penaltyAmount": 0,
          "penaltyDay": 0,
          "agentAmount": 0,
          "repayAmount": 0,
          "creditTimeStr": "2017.11.22"
        }
      ];

      // this.historyList = null;
    },
    mounted() {
      clickAnim('button_loginpop');
    }
  }
</script>
<style scoped lang="less">
  .bill_container {
    .loadmore {
      width: 100vw;
      min-height: 100vh;
      background: url("../../assets/img/bill/zd_bg.png") top no-repeat #F7F8FA;
      background-size: 100% 3.11rem;

      padding-bottom: 0.98rem;
      font-size: 0.28rem;

      .loadmore-text {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.3rem;
        img {
          width: 1rem;
          height: 1rem;
        }
      }

      .header {
        width: 96.5vw;

        font-size: 0.5rem;
        color: white;
        margin: 0.8rem auto 0 auto;
        padding-left: 0.14rem;
      }

      .card {
        width: 96.5vw;
        height: 2.13rem;
        background: url("../../assets/img/bill/white_bar@2x.png") center no-repeat;
        background-size: 100% 2.13rem;
        margin: 0.23rem auto 0 auto;

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.54rem;

        .card_default {
          width: 3.33rem;
          height: 0.89rem;
        }

        .card_left {

          .card_left_up {

            .amount {
              font-size: 0.48rem;
            }

          }

          .card_left_down {
            margin-top: 0.2rem;
            display: flex;
            align-items: center;
            font-size: 0.28rem;

            .stateStr {
              margin-left: 0.2rem;
              color: #333848;
            }

            .vertical_line {
              background-color: #666667;
              height: 0.28rem;
              width: 0.01rem;
              margin-left: 0.2rem;
            }

            .timeStamp {
              margin-left: 0.2rem;
              color: #666667;
            }
          }
        }

        .card_right {

          .payback {
            color: #358efe;
            font-size: 0.36rem;
          }

        }
      }

      .item {
        width: 100vw;
        height: 1.86rem;
        align-items: center;
        margin: 0 auto;
        padding-left: 0.1rem;

        .item_left {
          height: 1.86rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          .item_default {
            width: 3.14rem;
            height: 0.89rem;
          }
        }
      }

      .noCurrentBill {
        width: 92vw;
        height: 1.58rem;
        margin: 0.23rem auto 0 auto;
        color: rgba(255, 255, 255, 0.7);
      }

      .historyList {

        .historyTitle {
          width: 100%;
          padding: 0.3rem 1.8rem 0.3rem 1.8rem;
          margin: -0.1rem auto 0 auto;

          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #979899;
          font-size: 0.28rem;
        }

        .item {
          width: 100vw;
          height: 1.86rem;
          align-items: center;
          margin: 0 auto;
          padding-left: 0.1rem;

          .item_left {
            height: 1.86rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            .item_left_up {

              .amount {
                font-size: 0.48rem;
              }

            }

            .item_left_down {
              margin-top: 0.2rem;
              display: flex;
              font-size: 0.28rem;

              .stateStr {
                margin-left: 0.2rem;
                color: #333848;
              }

              .vertical_line {
                background-color: #666667;
                height: 0.28rem;
                width: 0.01rem;
                margin-left: 0.2rem;
              }

              .timeStamp {
                margin-left: 0.2rem;
                color: #666667;
              }
            }
          }

          .item_right {

            .next {
              width: 0.13rem;
              height: 0.23rem;
            }

          }

          .amount {
            font-size: 0.48rem;
          }

          .item_default {
            width: 3.14rem;
            height: 0.89rem;
          }
        }

      }

      .noHistoryBill {
        width: 92vw;
        margin: 0.5rem auto 0 auto;
        display: flex;
        justify-content: center;
        color: #979899;
        font-size: 0.28rem;
      }

      .noAnyBill {
        width: 92vw;
        margin: 0.23rem auto 0 auto;
        color: rgba(255, 255, 255, 0.7);
        display: flex;
        flex-direction: column;

        .noAnyBill_img {
          width: 3.02rem;
          height: 2.36rem;
          align-self: center;
          margin-top: 2.77rem;
        }
      }

    }

    .loginModal {
      width: 100%;
      height: 3.53rem;
      margin-bottom: 0.98rem;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;

      display: flex;
      flex-direction: column;
      align-items: center;

      .icon_loginpop {
        width: 2.09rem;
        height: 1.96rem;
        margin-top: -1.02rem;
      }

      .word_loginpop {
        width: 4.33rem;
        height: 0.45rem;
        margin-top: 0.17rem;
      }

      .button_loginpop {
        width: 3.64rem;
        height: 0.8rem;
        margin-top: 0.62rem;

        transition: all .2s ease;
        transform-origin: bottom;
      }
    }
  }

</style>
