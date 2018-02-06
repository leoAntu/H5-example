<template>
  <div class="loan_container">
    <mt-loadmore
      class="loadmore"
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
        <div class="tips" v-show="carousel.length!==1">
          <img class="horn" src="../../assets/img/loan/icon_notice@2x.png"/>
          <mt-swipe class="carousel" :auto="4000" :speed="300" :show-indicators="false" :prevent="true">
            <mt-swipe-item v-for="v,k in carousel" :key="k">{{v.value}}</mt-swipe-item>
          </mt-swipe>
        </div>
      </div>

      <div class="card">
        <div class="top-loan-container">
          <span class="top-loan-title">{{headerCard.title?headerCard.title:'最高可借'}}</span>
          <span class="top-loan-number" id="maxLoan">{{maxLoan}}</span>
        </div>
        <div class="btn_lmnq" @click="getLoan()">
          <span>{{headerCard.btnTitle?headerCard.btnTitle:'立马拿钱'}}</span>
        </div>
        <div class="remark">
          <span>{{headerCard.remark?headerCard.remark:'超快审批、超低利息、超速到账'}}</span>
        </div>
      </div>

      <div class="center">
        <div class="each_center left" @click="toInsideLink('/certifyCenter')">
          <div
            class="center-icon"
            :style="{backgroundImage:`url(${mainBanner.leftBanner.icon?mainBanner.leftBanner.icon:require('../../assets/img/loan/icon_ID@2x.png')})`}">
          </div>
          <span class="center-title">{{mainBanner.leftBanner.title?mainBanner.leftBanner.title:'认证中心'}}</span>
        </div>
        <div class="each_center middle" @click="toInsideLink('/H5/helpCenter')">
          <div
            class="center-icon"
            :style="{backgroundImage:`url(${mainBanner.centerBanner.icon?mainBanner.centerBanner.icon:require('../../assets/img/loan/icon_help@2x.png')})`}"></div>
          <span class="center-title">{{mainBanner.centerBanner.title?mainBanner.centerBanner.title:'帮助中心'}}</span>
        </div>
        <div class="each_center right" @click="toInsideLink('/H5/borrowRaiders')">
          <div
            class="center-icon"
            :style="{backgroundImage:`url(${mainBanner.rightBanner.icon?mainBanner.rightBanner.icon:require('../../assets/img/loan/icon_Raiders@2x.png')})`}"></div>
          <span class="center-title">{{mainBanner.rightBanner.title?mainBanner.rightBanner.title:'借款攻略'}}</span>
        </div>
      </div>

      <div class="Ads">
        <img class="each_Ad" v-for="v,k in bannerList" :key="k" v-lazy="`${v.imgUrl}`" @click="toInsideLink(v.link)">
      </div>

      <div class="footer" style="padding-bottom: calc(1.38rem + env(safe-area-inset-bottom));">
        <span>富卡承诺不向在校大学生借款</span>
      </div>

    </mt-loadmore>

    <!--popup-->
    <mt-popup
      class="popup"
      v-model="barVisible"
      position="top"
      :modal="false">
      <div class="popup_content">
        <span>{{headerCard.title?headerCard.title:'最高可借'}} <span id="maxLoanSmall">{{maxLoan}}</span></span>
        <img class="btn_img" src="../../assets/img/loan/btn_image@2x.png" @click="getLoan()"/>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import {clickAnim} from "../../utils/animate";
  import moment from 'moment'
  import {CountUp} from '../../utils/countUp'
  import hex_md5 from '../../utils/md5'
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        carousel: [
          {
            id: '1',
            value: '尾号3100张先生1分钟前成功借款3000元',
          },
          {
            id: '2',
            value: '尾号7206王女士1分钟前成功借款1200元',
          },
          {
            id: '3',
            value: '尾号3650李先生2分钟前成功借款900元',
          }
        ],

        maxLoan: '-,---.--',

        headerCard: {
          title: "",
          btnTitle: "",
          remark: ""
        },

        /**认证中心、帮助中心、借款攻略**/
        mainBanner: {
          leftBanner: {
            title: "",
            link: "",
            icon: ""
          },
          centerBanner: {
            title: "",
            link: "",
            icon: ""
          },
          rightBanner: {
            title: "",
            link: "",
            icon: ""
          }
        },

        bannerList: [],

        barVisible: false,

        topStatus: ''
      }
    },
    methods: {
      /**顶部弹窗**/
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        // let offsetTop = document.querySelector('.remark').offsetTop;
        let offsetTop = 260;

        // console.log(scrollTop,offsetTop);

        this.barVisible = scrollTop > offsetTop;
      },

      /**下拉刷新**/
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
          this.getIndexData();
        }, 1500);
      },
      /**下拉刷新样式触发方法**/
      handleTopChange(status) {
        this.topStatus = status;
      },

      /**跳转**/
      toInsideLink(path) {
        this.$router.push({
          path: path,
        })
      },
      /**去登陆**/
      toLogin() {
        this.$router.push({
          name: 'getCode',
        });
      },

      /**立马拿钱**/
      getLoan() {
        this.$router.push({
          name: 'borrowCenter',
        });
      },

      /**数字跳动**/
      // target = id of html element or var of previously selected html element where counting occurs
      // startVal = the value you want to begin at
      // endVal = the value you want to arrive at
      // decimals = number of decimal places, default 0
      // duration = duration of animation in seconds, default 2
      // options = optional object of options (see below)
      countUp(elID, startVal, endVal, decimals, duration, options) {
        let numAnim = new CountUp(elID, startVal, endVal, 2, 1, {useEasing: true});
        if (!numAnim.error) {
          numAnim.start();
        } else {
          console.error(numAnim.error);
        }
      },

      getIndexData() {
        //TODO getData为默认数据 未访问接口
        let date = new Date();
        let time = moment(date).format('YYYYMMDDHHmmss');

        this.carousel = [
          {
            id: '1',
            value: '尾号3100张先生1分钟前成功借款3000元',
          },
          {
            id: '2',
            value: '尾号7206王女士1分钟前成功借款1200元',
          },
          {
            id: '3',
            value: '尾号3650李先生2分钟前成功借款900元',
          }
        ];
        this.maxLoan = parseFloat('20000.00');
        this.headerCard = {
          title: "最高可借",
          btnTitle: "立马拿钱",
          remark: "超快审批、超低利息、超速到账"
        };
        this.bannerList = [
          {
            imgUrl: require('../../assets/img/advertise/20180105/newbies_banner.png'),
            link: '/H5/ad_NewbiesWelfare_20180105',
          },
          {
            imgUrl: require('../../assets/img/advertise/20180105/aletter_banner.png'),
            link: '/H5/ad_ALetter_20180105',
          },
        ];

        /**数字跳动**/
        this.countUp('maxLoan', this.maxLoan / 10, this.maxLoan);

        /**数字跳动**/
        this.countUp('maxLoanSmall', this.maxLoan / 10, this.maxLoan);

        /**0、根据首页数据中的isLogin改变登录状态**/
        if (false) {
          this.$store.commit('updateIsLogin', true)
        } else {
          this.$store.commit('updateIsLogin', false)
        }

        // this.$http({
        //   url: this.$getApi + '/api/borrow/findIndex.htm',
        //   method: 'POST',
        //   headers: {
        //     'isH5': '1',
        //     'time': time,
        //     'signMsg': hex_md5(`90431FAC56A2BA40AE7BB7FE5339AA9B${time}`).toUpperCase(),
        //   },
        //   before() {
        //     Indicator.open({
        //       text: '请稍候',
        //       spinnerType: 'triple-bounce'
        //     });
        //   },
        // }).then(res => {
        //   Indicator.close();
        //   if (res.body.code === 200) {
        //     this.carousel = res.body.data.carousel;
        //     this.maxLoan = parseFloat(res.body.data.maxLoan);
        //     this.headerCard = res.body.data.headerCard;
        //     this.mainBanner = res.body.data.mainBanner;
        //     this.bannerList = res.body.data.bannerList;
        //
        //     /**数字跳动**/
        //     this.countUp('maxLoan', this.maxLoan / 10, this.maxLoan);
        //
        //     /**数字跳动**/
        //     this.countUp('maxLoanSmall', this.maxLoan / 10, this.maxLoan);
        //
        //     /**0、根据首页数据中的isLogin改变登录状态**/
        //     if (res.body.isLogin) {
        //       this.$store.commit('updateIsLogin', true)
        //     } else {
        //       this.$store.commit('updateIsLogin', false)
        //     }
        //
        //   } else {
        //     Toast({
        //       message: res.body.msg,
        //       duration: 1500
        //     })
        //   }
        // }).catch(e => {
        //   Indicator.close();
        //   Toast({
        //     message: e.body,
        //     duration: 1500
        //   })
        // })
      }
    },

    created() {

    },
    mounted() {
      this.getIndexData();
      window.addEventListener('scroll', this.handleScroll);
      clickAnim('btn_lmnq');
      clickAnim('left');
      clickAnim('middle');
      clickAnim('right');
      clickAnim('btn_img');
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style scoped lang="less">
  .loan_container {
    background-color: white;
    .loadmore {
      width: 100vw;
      background: url("../../assets/img/loan/bg_index.jpg") top no-repeat;
      background-size: 100% 3.5rem;
      .loadmore-text {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.3rem;
        img {
          width: 1rem;
          height: 1rem;
        }
      }

      .header {
        width: 100vw;
        height: 3.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        .tips {
          width: 92%;
          display: flex;
          align-items: center;
          margin-top: 0.8rem;

          .horn {
            width: 0.23rem;
            height: 0.24rem;
          }

          .carousel {
            width: 100%;
            height: 0.3rem;
            margin-left: 0.12rem;
            color: white;
            font-size: 0.28rem;
          }
        }
      }

      .card {
        width: 94.93vw;
        height: 4.73rem;
        background: url("../../assets/img/loan/image_card@2x.png") center center no-repeat;
        background-size: 100% 4.73rem;

        margin: -2.03rem auto 0 auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.62rem;

        .top-loan-container {
          color: #403C3C;

          display: flex;
          flex-direction: column;
          align-items: center;

          .top-loan-title {
            font-size: 0.36rem;
          }

          .top-loan-number {
            margin-top: 0.32rem;
            font-size: 0.84rem;
          }
        }

        .btn_lmnq {
          width: 3.6rem;
          height: 0.92rem;
          background: url("../../assets/img/loan/btn_lmnq@2x.png") center no-repeat;
          background-size: cover;

          margin-top: 0.55rem;
          font-size: 0.32rem;
          color: white;
          padding-top: 0.19rem;

          display: flex;
          justify-content: center;

          transition: all .2s ease;
          transform-origin: bottom;
        }

        .remark {
          margin-top: 0.16rem;
          font-size: 0.26rem;
          color: #999999;
        }
      }

      .center {
        width: 92vw;
        margin: 0 auto;
        padding: 0.18rem 0 0.1rem 0;
        display: flex;
        justify-content: space-around;

        .each_center {
          width: 1.8rem;
          height: 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          transition: all .2s ease;
          transform-origin: bottom;

          .center-icon {
            width: 0.6rem;
            height: 0.6rem;
            background: center center no-repeat;
            background-size: contain;
          }

          .center-title {
            font-size: 0.28rem;
            margin-top: 0.25rem;
          }
        }
      }

      .Ads {
        width: 92vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-bottom: 0.2rem;
        margin: 0 auto;

        .each_Ad {
          width: 6.9rem;
          object-position: center center;
          object-fit: contain;
          height: 2.9rem;
          margin: 0.2rem 0;
        }

        .each_Ad[lazy=loading] {
          width: 0.8rem;
          height: 2.9rem;
          margin: auto;
        }
      }

      .footer {
        width: 100vw;
        padding-top: 0.4rem;
        text-align: center;
        background-color: #F7F8FA;
        font-size: 0.28rem;
        color: #999999;
        padding-bottom: 1.38rem;
      }
    }

    .popup {
      width: 100%;
      height: 1rem;
      box-shadow: 0 0.03rem 0.12rem 0 #d0d9e2;
      display: flex;
      justify-content: center;

      .popup_content {
        width: 92%;
        font-size: 0.34rem;
        color: #333848;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .btn_img {
          height: 0.26rem;
          width: 1.11rem;

          transition: all .2s ease;
          transform-origin: bottom;
        }
      }
    }
  }
</style>
