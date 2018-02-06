<template>
  <div class="helpCenter">
    <div class="banner">

    </div>
    <div class="header">
      <span class="header-title">帮助中心</span>
      <span class="header-text">智能回收租赁专家</span>
    </div>

    <div class="card">
      <div class="each_question common" @click="toAnswer('common')">
        <div class="question_icon"
             :style="{backgroundImage:`url(${require('../../assets/img/helpCenter/icon_examine@2x.png')})`}"></div>
        <span class="question_title" :style="{color: titleCommon}">常见问题</span>
      </div>
      <div class="each_question certify" @click="toAnswer('certify')">
        <div class="question_icon"
             :style="{backgroundImage:`url(${require('../../assets/img/helpCenter/icon_at@2x.png')})`}"></div>
        <span class="question_title" :style="{color: titleCertify}">认证问题</span>
      </div>
      <div class="each_question borrow" @click="toAnswer('borrow')">
        <div class="question_icon"
             :style="{backgroundImage:`url(${require('../../assets/img/helpCenter/icon_Loan@2x.png')})`}"></div>
        <span class="question_title" :style="{color: titleBorrow}">租赁问题</span>
      </div>
      <div class="each_question payback" @click="toAnswer('payback')">
        <div class="question_icon"
             :style="{backgroundImage:`url(${require('../../assets/img/helpCenter/icon_repay@2x.png')})`}"></div>
        <span class="question_title" :style="{color: titlePayback}">交租问题</span>
      </div>
    </div>

    <div class="answerList">
      <transition-group name="fade" mode="out-in">
        <div v-if="titleCommon==='#333848'" :key="1">
          <!--/**常见问题**/-->
          <div class="each_answer" v-for="item in answerList.common">
            <div class="answer_up">
              <img class="mark" src="../../assets/img/helpCenter/icon_question@2x.png"/>
              <span class="answer_title">{{item.title}}</span>
            </div>
            <div class="answer_down">
              <p class="paragraph" v-for="v in item.paragraph">{{v}}</p>
            </div>
          </div>
        </div>
        <div v-if="titleCertify==='#333848'" :key="2">
          <!--/**认证问题**/-->
          <div class="each_answer" v-for="item in answerList.certify">
            <div class="answer_up">
              <img class="mark" src="../../assets/img/helpCenter/icon_question@2x.png"/>
              <span class="answer_title">{{item.title}}</span>
            </div>
            <div class="answer_down">
              <p class="paragraph" v-for="v in item.paragraph">{{v}}</p>
            </div>
          </div>
        </div>
        <div v-if="titleBorrow==='#333848'" :key="3">
          <!--/**借款问题**/-->
          <div class="each_answer" v-for="item in answerList.borrow">
            <div class="answer_up">
              <img class="mark" src="../../assets/img/helpCenter/icon_question@2x.png"/>
              <span class="answer_title">{{item.title}}</span>
            </div>
            <div class="answer_down">
              <p class="paragraph" v-for="v in item.paragraph">{{v}}</p>
            </div>
          </div>
        </div>
        <div v-if="titlePayback==='#333848'" :key="4">
          <!--/**还款问题**/-->
          <div class="each_answer" v-for="item in answerList.payback">
            <div class="answer_up">
              <img class="mark" src="../../assets/img/helpCenter/icon_question@2x.png"/>
              <span class="answer_title">{{item.title}}</span>
            </div>
            <div class="answer_down">
              <p class="paragraph" v-for="v in item.paragraph">{{v}}</p>
            </div>
          </div>
        </div>
      </transition-group>

      <!--/**客服电话**/-->
      <div class="each_answer">
        <div class="hotLine" @click="contactUs">客服电话</div>
        <div class="contactUs">
          <span>还有问题？联系我们</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { clickAnim } from "../../utils/animate";
  import answerList from './answerList.json'
  // import {MessageBox} from 'mint-ui';
  import {BaiduTongji} from "../../utils/BaiduTongji";

  export default {
    name: "help-center",
    data() {
      return {
        answerList,
        titleCommon: '#333848',
        titleCertify: '#979899',
        titleBorrow: '#979899',
        titlePayback: '#979899',
      }
    },
    methods: {
      contactUs() {
        window.location.href = "tel:400-080-8012";
        // MessageBox({
        //   title: '拨打电话',
        //   message: '400-080-8012',
        //   showCancelButton: true,
        //   confirmButtonText: '拨打',
        // }).then(()=>{
        //   window.location.href = "tel:400-080-8012";
        // });
      },
      toAnswer(name) {
        switch (name) {
          case 'common':
            this.titleCommon = '#333848';
            this.titleCertify = '#979899';
            this.titleBorrow = '#979899';
            this.titlePayback = '#979899';
            break;
          case 'certify':
            this.titleCommon = '#979899';
            this.titleCertify = '#333848';
            this.titleBorrow = '#979899';
            this.titlePayback = '#979899';
            break;
          case 'borrow':
            this.titleCommon = '#979899';
            this.titleCertify = '#979899';
            this.titleBorrow = '#333848';
            this.titlePayback = '#979899';
            break;
          case 'payback':
            this.titleCommon = '#979899';
            this.titleCertify = '#979899';
            this.titleBorrow = '#979899';
            this.titlePayback = '#333848';
            break;
        }
      }
    },

    /**life cycle**/
    mounted() {
      clickAnim('common');
      clickAnim('certify');
      clickAnim('borrow');
      clickAnim('payback');
      clickAnim('hotLine');
      BaiduTongji();
    },
  }
</script>

<style scoped lang="less">
  .helpCenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.3rem;
    color: #666667;
    .banner {
      width: 100%;
      height: 4.37rem;
      position: absolute;
      z-index: 1;
      background: url("../../assets/img/helpCenter/image_bg@2x.png") top no-repeat;
      background-size: cover;
    }
    .header {
      position: relative;
      z-index: 2;
      width: 92%;
      color: white;
      padding-top: 0.8rem;
      padding-bottom: 0.46rem;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .header-title {
        font-size: 0.5rem;
      }
      .header-text {
        font-size: 0.24rem;
        margin-top: 0.2rem;
      }
    }

    .card {
      position: relative;
      z-index: 2;
      width: 95.2%;
      height: 2.54rem;
      background: url("../../assets/img/helpCenter/card@2x.png") center no-repeat;
      background-size: 100% 2.54rem;

      display: flex;
      justify-content: space-around;
      align-items: center;

      .each_question {
        margin-top: -0.12rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        transition: all .2s ease;
        transform-origin: bottom;
        .question_icon {
          width: 0.58rem;
          height: 0.55rem;
          background: center center no-repeat;
          background-size: contain;
        }

        .question_title {
          margin-top: 0.3rem;
          font-size: 0.28rem;

          transition: all .2s ease;
        }
      }
    }

    .answerList {
      width: 92%;
      padding-bottom: 0.1rem;
      .each_answer {
        background-color: white;
        margin-top: 0.05rem;
        margin-bottom: 0.2rem;
        border-radius: 0.06rem;
        padding: 0.57rem 0.3rem 0.54rem 0.3rem;
        .answer_up {
          display: flex;
          align-items: center;
          .mark {
            width: 0.4rem;
            height: 0.4rem;
          }
          .answer_title {
            font-size: 0.36rem;
            color: #333333;
            margin-left: 0.2rem;
          }
        }
        .answer_down {
          margin-top: 0.3rem;
          .paragraph {
            line-height: 0.4rem;
          }
        }

        .hotLine {
          width: 85.5%;
          height: 0.8rem;
          margin: 0 auto;
          border-radius: 0.06rem;
          background-color: #4089FE;
          font-size: 0.36rem;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;

          transition: all .2s ease;
          transform-origin: bottom;
        }
        .contactUs {
          text-align: center;
          margin-top: 0.3rem;
        }
      }
    }
  }
</style>
