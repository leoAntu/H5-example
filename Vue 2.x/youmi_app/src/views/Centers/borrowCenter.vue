<template>
  <div class="borrow">
    <back :title="'立马拿钱'"></back>
    <div class="up">

      <div class="title">
        <div class="title_left">
          <img src="../../assets/img/borrowCenter/jk_icon_jk@2x.png"/>
          <span>申请借款</span>
        </div>
        <div class="title_right">
          <img src="../../assets/img/borrowCenter/jk_word_youhui@2x.png"/>
        </div>
      </div>

      <div class="amount">
        <div class="amount_left">
          <span>￥</span>
          <input
            id="amount"
            :type="inputType"
            :placeholder="`最高可借${top}元`"
            pattern="[0-9]*"
            v-model.lazy="amount"
            @blur="blur"
            @focus="focus"
          >
        </div>
        <div class="amount_right">
          <span class="borrowAll" v-show="!amountNum" @click="borrowAll">全部借出</span>
          <img v-show="amountNum" @click="clear" class="clearAmountNum" src="../../assets/img/login/close.png"/>
        </div>
      </div>

      <div class="tips">
        <span>{{bottom}}-{{top}}元 借款金额为100的倍数 日利率{{rate}}</span>
      </div>

      <div class="durations">
        <div class="monthly month_3" :style="{backgroundImage:`url(${month_3})`}" @click="chooseDuration(3)">
        </div>
        <div class="monthly month_6" :style="{backgroundImage:`url(${month_6})`}" @click="chooseDuration(6)">
        </div>
      </div>

    </div>

    <div class="middle">

      <div class="account">
        <div class="account_title_left">
          <img src="../../assets/img/borrowCenter/icon_money@2x.png"/>
          <span>收款账户</span>
        </div>
        <div class="account_title_right" v-if="!boundCard" @click="toBindCard">
          <span>去绑卡</span>
          <img src="../../assets/img/borrowCenter/right@2x.png"/>
        </div>
      </div>

      <div class="card_info" v-if="boundCard">
        <div class="bankName"><span>{{bankName}}</span></div>
        <div class="bankAccount"><span>{{bankAccount}}</span></div>
      </div>

    </div>

    <div class="list" v-if="detailVisible">
      <div class="each_container">
        <div class="title"  @click="usageVisible = true">
          <div class="title_left">
            <span>借款用途</span>
          </div>
          <div class="title_right">
            <span>{{usageOfLoan}}</span><img class="arrow_right" src="../../assets/img/borrowCenter/jk_btn_right@2x.png"/>
          </div>
        </div>
      </div>
      <div class="each_container">
        <div class="title">
          <div class="title_left">
            <span>还款方式</span>
          </div>
          <div class="title_right">
            <span>{{paybackMethod}}</span>
          </div>
        </div>
      </div>
      <div class="each_container">
        <div class="title" @click="collapse('paybackEachPeriod')">
          <div class="title_left">
            <span>每期应还</span>
            <img @click="planVisible=true" src="../../assets/img/borrowCenter/jk_btn_details@2x.png"/>
          </div>
          <div class="title_right">
            <span>约{{paybackEachPeriod}}</span><img class="arrow paybackEachPeriodArrow" src="../../assets/img/borrowCenter/jk_btn_zhankai@2x.png"/>
          </div>
        </div>
        <div class="paybackEachPeriod">
          <div class="item">
            <div class="item_left">
              <span>每期应还本金</span>
            </div>
            <div class="item_right">
              <span>1200.00元</span>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <span>每期账户管理费</span>
            </div>
            <div class="item_right">
              <span>31.98元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="each_container" style="border: none">
        <div class="title" @click="collapse('moneyReceive')">
          <div class="title_left">
            <span>到账金额</span>
          </div>
          <div class="title_right">
            <span>{{moneyReceive}}</span><img class="arrow moneyReceiveArrow" src="../../assets/img/borrowCenter/jk_btn_zhankai@2x.png"/>
          </div>
        </div>
        <div class="moneyReceive">
          <div class="item">
            <div class="item_left">
              <span>支付信审费</span>
            </div>
            <div class="item_right">
              <span>31.98元</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="protocol">
        <img src="../../assets/img/borrowCenter/checked@2x.png"/>
        <span>我已阅读及同意<span>《富卡借款协议》</span></span>
      </div>
      <div class="getLoanButton"><span>立马拿钱</span></div>
    </div>

    <mt-popup class="popup" v-model="usageVisible" position="bottom">
      <div class="popup_title">
        <span>选择借款用途</span>
        <img @click="usageVisible = false" src="../../assets/img/borrowCenter/popup_btn_close@2x.png"/>
      </div>
      <ul class="popup_list">
        <li v-for="item,key in usageList" :key="key" @click="chooseUsageOfLoan(item)" :style="{color:item===usageOfLoan?'#333848':'#979899'}">{{item}}</li>
      </ul>
    </mt-popup>

    <mt-popup class="planPopup" v-model="planVisible" popup-transition="popup-fade">
      <div class="planTitle">
        <div class="planTitle_left">还款计划</div>
        <div class="planTitle_right">
          <img @click="planVisible = false" src="../../assets/img/borrowCenter/popup_btn_close@2x.png"/>
        </div>
      </div>
      <div class="planContainer">
        <div class="planItem" v-for="item in plan">
          <div class="planItem_left">{{item.left}}</div>
          <div class="planItem_right">{{item.right}}</div>
        </div>
      </div>
    </mt-popup>


  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import {clickAnim} from "../../utils/animate";
  import back from '../../components/back'

  export default {
    name: "borrow-center",
    data() {
      return {
        amount: '',
        amountNum: '',
        inputType: 'text',

        paybackEachPeriodCollapsed: true,
        moneyReceiveCollapsed: true,

        top: 20000,
        bottom: 500,
        rate: '0.036%',
        month_3: require('../../assets/img/borrowCenter/jk_btn_3gray@2x.png'),
        month_6: require('../../assets/img/borrowCenter/jk_btn_6gray@2x.png'),
        boundCard: false,
        detailVisible: false,
        bankName: '招商银行',
        bankAccount: '8214 ************ 215',
        usageOfLoan: '',
        usageVisible: false,

        usageList:[
          '个人或家庭消费',
          '住宅装修',
          '旅游',
          '购买原材料',
          '店面装修',
        ],
        paybackMethod: '等额本息',
        paybackEachPeriod: '1785.00元',
        moneyReceive: '2349.00元',

        planVisible: false,
        plan: [
          {
            left:'1/3期 | 2017.11.24',
            right: '1320.05元'
          },
          {
            left:'2/3期 | 2017.11.24',
            right: '1320.05元'
          },
          {
            left:'3/3期 | 2017.11.24',
            right: '1320.05元'
          },
        ]
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      collapse(className) {
        switch (className){
          case 'paybackEachPeriod':
            if (this.paybackEachPeriodCollapsed) {
              $('.paybackEachPeriod').css('opacity','1').css('height', '1.28rem');
              $('.paybackEachPeriodArrow').css('transform','rotate(-180deg)');
              this.paybackEachPeriodCollapsed = false;
            } else {
              $('.paybackEachPeriod').css('opacity','0').css('height', '0');
              $('.paybackEachPeriodArrow').css('transform','rotate(0deg)');
              this.paybackEachPeriodCollapsed = true
            }
            break;
          case 'moneyReceive':
            if (this.moneyReceiveCollapsed) {
              $('.moneyReceive').css('opacity','1').css('height', '0.74rem');
              $('.moneyReceiveArrow').css('transform','rotate(-180deg)');
              this.moneyReceiveCollapsed = false;
            } else {
              $('.moneyReceive').css('opacity','0').css('height', '0');
              $('.moneyReceiveArrow').css('transform','rotate(0deg)');
              this.moneyReceiveCollapsed = true
            }
            break;
        }
      },
      /**插入千位分隔符**/
      toThousands(num) {
        var result = '', counter = 0;
        num = (num || 0).toString();
        for (var i = num.length - 1; i >= 0; i--) {
          counter++;
          result = num.charAt(i) + result;
          if (!(counter % 3) && i !== 0) {
            result = ',' + result;
          }
        }
        return result;
      },
      /**失焦（发生改变）时，储存值Num保存e.target.value，展示值amount千位化**/
      blur(e) {
        /**将input类型改为text,否则前端无法显示.00**/
        this.inputType = 'text';
        this.amountNum = parseInt(e.target.value / 100) * 100;
        /**若储存值Num不在限额内，则将储存值Num和展示值amount重置**/
        if (this.amountNum > this.top) {
          this.amountNum = this.top;
          this.amount = this.toThousands(this.top) + '.00'
        } else if (this.amountNum < this.bottom) {
          Toast(`亲，最低${this.bottom}元起借哦~`);
          this.amountNum = this.bottom;
          this.amount = this.toThousands(this.bottom) + '.00'
        } else {
          this.amount = this.toThousands(this.amountNum) + '.00'
        }
      },
      /**聚焦时，将之前储存num赋给amount展示**/
      focus(e) {
        /**将input类型改为number,否则安卓无法输入数字**/
        this.inputType = 'number';
        this.amount = this.amountNum;
      },
      /**全部借出**/
      borrowAll() {
        this.amountNum = this.top;
        this.amount = this.toThousands(this.top) + '.00'
      },
      /**清空**/
      clear() {
        this.amountNum = '';
        this.amount = '';
      },
      /**选择借款周期**/
      chooseDuration(monthNum) {
        if (monthNum === 3) {
          this.month_3 = require('../../assets/img/borrowCenter/jk_btn_3blue@2x.png');
          this.month_6 = require('../../assets/img/borrowCenter/jk_btn_6gray@2x.png');
        } else if (monthNum === 6) {
          this.month_3 = require('../../assets/img/borrowCenter/jk_btn_3gray@2x.png');
          this.month_6 = require('../../assets/img/borrowCenter/jk_btn_6blue@2x.png');
        }
      },
      /**去绑卡**/
      toBindCard() {
        alert('去绑卡')
      },
      /**选择借款用途**/
      chooseUsageOfLoan(name) {
        this.usageOfLoan = name;
        setTimeout(()=>{
          this.usageVisible = false
        },300)
      }
    },
    components: {
      back
    },
    mounted() {
      clickAnim('month_3');
      clickAnim('month_6');
      clickAnim('getLoanButton');
      clickAnim('account_title_right');
      clickAnim('borrowAll');
      clickAnim('clearAmountNum');
    },
    updated() {
      /**只有当金额和两种周期中的一种被选择时，才会展示详情**/
      this.detailVisible = this.amount && (this.month_3 === require('../../assets/img/borrowCenter/jk_btn_3blue@2x.png') || this.month_6 === require('../../assets/img/borrowCenter/jk_btn_6blue@2x.png'));
    }
  }
</script>

<style scoped lang="less">
  .borrow {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.3rem;
    padding-bottom: 0.7rem;

    .up {
      width: 100%;
      background-color: white;
      margin-top: 1.08rem;
      padding-top: 0.3rem;

      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        width: 92%;

        display: flex;
        justify-content: space-between;
        align-items: center;
        .title_left {
          display: flex;
          align-items: center;
          font-size: 0.3rem;
          img {
            height: 0.34rem;
            width: 0.34rem;
          }
          span {
            margin-left: 0.1rem;
          }
        }
        .title_right {
          img {
            height: 0.24rem;
            width: 2.12rem;
          }
        }
      }

      .amount {
        border-bottom: 0.01rem #b5bac4 solid;
        width: 92%;
        padding: 0.8rem 0 0.3rem 0;

        display: flex;
        justify-content: space-between;
        .amount_left {
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          span {
            font-size: 0.48rem;
          }
          input {
            width: 100%;
            font-size: 0.8rem;
            height: 0.9rem;
          }
          input::-webkit-input-placeholder {
            font-size: 0.49rem;
            color: #999999;
            line-height: 1rem;
          }
        }
        .amount_right {
          width: 42%;
          font-size: 0.3rem;
          color: #358efe;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            padding-top: 0.2rem;
            transition: all .2s ease;
            transform-origin: bottom;
          }
          img {
            height: 0.22rem;
            width: 0.22rem;
            transition: all .2s ease;
            transform-origin: bottom;
          }
        }
      }

      .tips {
        width: 92%;
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #979899;
      }

      .durations {
        width: 92%;
        padding: 0.5rem 0 0.7rem 0;

        display: flex;
        justify-content: flex-start;
        .monthly {
          width: 1.73rem;
          height: 0.72rem;
          background: center center no-repeat;
          background-size: contain;
          border-radius: 0.36rem;
          margin-right: 0.3rem;

          transition: all .2s ease;
          transform-origin: bottom;
        }
      }
    }

    .middle {
      width: 100%;
      background-color: white;
      margin-top: 0.2rem;
      padding: 0.4rem 0 0.4rem 0;

      display: flex;
      flex-direction: column;
      align-items: center;

      .account {
        width: 92%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .account_title_left {
          display: flex;
          align-items: center;
          img {
            width: 0.4rem;
            height: 0.29rem;
            margin-right: 0.1rem;
          }
        }
        .account_title_right {
          display: flex;
          align-items: center;
          color: #358efe;
          transition: all .2s ease;
          transform-origin: bottom;
          img {
            width: 0.13rem;
            right: 0.23rem;
            margin-left: 0.1rem;
          }
        }
      }

      .card_info {
        margin: 0.3rem 0 0.3rem 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        .bankName {
          font-size: 0.3rem;
          color: #666667;
        }
        .bankAccount {
          font-size: 0.48rem;
          margin-top: 0.25rem;
        }
      }
    }

    .list {
      width: 100%;
      background-color: white;
      margin-top: 0.2rem;

      display: flex;
      flex-direction: column;
      align-items: center;

      .each_container {
        width: 92%;
        border-bottom: 0.01rem #d3d5db solid;

        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          width: 100%;
          padding: 0.4rem 0 0.4rem 0;

          display: flex;
          justify-content: space-between;
          align-items: center;
          .title_left {
            display: flex;
            align-items: center;
            color: #666667;
            img {
              margin-left: 0.1rem;
              width: 0.3rem;
              height: 0.3rem;
            }
          }
          .title_right {
            display: flex;
            align-items: center;
            .arrow_right {
              width: 0.12rem;
              height: 0.21rem;
              margin-left: 0.1rem;
            }
            .arrow {
              width: 0.21rem;
              height: 0.12rem;
              margin-left: 0.1rem;
              transition: all .2s ease;
            }
          }
        }

        .paybackEachPeriod {
          width: 85.6%;
          height: 0;
          transition: all .5s ease;
          overflow: hidden;

          color: #979899;

          display: flex;
          flex-direction: column;
          align-items: center;
          .item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-bottom: 0.2rem;
            .item_left {
            }
            .item_right {

            }
          }
        }

        .moneyReceive {
          width: 85.6%;
          height: 0;
          transition: all .5s ease;
          overflow: hidden;

          color: #979899;

          display: flex;
          flex-direction: column;
          align-items: center;
          .item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-bottom: 0.2rem;
            .item_left {
            }
            .item_right {

            }
          }
        }
      }
    }

    .bottom {
      width: 92%;

      margin-top: 1rem;
      .protocol{
        display: flex;
        align-items: center;
        img {
          width: 0.26rem;
          height: 0.26rem;
        }
        span {
          font-size: 0.28rem;
          margin-left: 0.1rem;
          color: #666666;
          span {
            color: #358efe;
          }
        }
      }
      .getLoanButton{
        width: 100%;
        height: 1rem;

        background-color: #358efe;
        font-size: 0.34rem;
        color: white;
        border-radius: 0.06rem;

        margin-top: 0.3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all .2s ease;
        transform-origin: bottom;
      }
    }

    .popup{
      width: 100%;
      font-size: 0.36rem;
      .popup_title {
        border-bottom: 0.01rem #d3d5db solid;
        padding: 0.4rem 0.28rem;
        color: #666667;

        display: flex;
        justify-content: space-between;
        img {
          height: 0.38rem;
          width: 0.38rem;
        }
      }
      .popup_list {
        padding-bottom: 0.7rem;
        text-align: center;
        color: #979899;
        li {
          margin-top: 0.7rem;
          transition: all .2s ease;
        }
      }
    }

    .planPopup {
      width: 85.33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.06rem;
      .planTitle {
        width: 89.23%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.34rem;
        padding: 0.4rem 0;
        border-bottom: 0.01rem #d3d5db solid;
        img {
          height: 0.38rem;
          width: 0.38rem;
        }
      }
      .planContainer {
        width: 89.23%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.4rem;
        .planItem {
          width: 100%;
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .planItem_left {
            color: #979899;
          }
          .planItem_right {
            color: #666667;
          }
        }
      }
    }

  }
</style>
