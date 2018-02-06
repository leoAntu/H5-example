<template>
  <div class="supportedBank">
    <div class="supportedCardTitle"><span>仅支持借记卡</span></div>
    <div class="supportedCardList">
      <div class="supportedCardItem" v-for="item in supportedCardList">
        <img :src="item.icon"><span>{{item.bankName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {BaiduTongji} from "../../utils/BaiduTongji";
  export default {
    name: "supported-bank",
    data() {
      return {
        supportedCardList: [
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_abc.png'),
            bankName: '中国农业银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_jiaotong.png'),
            bankName: '交通银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_youzheng.png'),
            bankName: '中国邮政储蓄银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_icbc.png'),
            bankName: '中国工商银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_pufa.png'),
            bankName: '上海浦东发展银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_guangfa.png'),
            bankName: '广东发展银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_pingan.png'),
            bankName: '平安银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_zhaoshang.png'),
            bankName: '招商银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/jk_icon_bank_hengfeng.png'),
            bankName: '恒丰银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_zhongguo.png'),
            bankName: '中国银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_jianhang.png'),
            bankName: '中国建设银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_ebank.png'),
            bankName: '中国光大银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_xingye.png'),
            bankName: '兴业银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_zhongxin.png'),
            bankName: '中信银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_huaxia.png'),
            bankName: '华夏银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_hangzhou.png'),
            bankName: '杭州银行',
          },
          {
            icon: require('../../assets/img/borrowRaiders/rz_supportbanklogo_bj.png'),
            bankName: '北京银行',
          },
        ]
      }
    },
    mounted() {
      $(window).scrollTop(0);
      BaiduTongji();
    }
  }
</script>

<style scoped lang="less">
  .supportedBank {
    width: 100%;
    font-size: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1.2rem;
    background-color: white;
    .supportedCardTitle {
      width: 92%;
      margin-top: 0.4rem;
      font-size: 0.28rem;
      color: #333333;
    }
    .supportedCardList {
      width: 92%;
      .supportedCardItem {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        img {
          width: 0.44rem;
          height: 0.44rem;
          object-fit: contain;
          object-position: center center;
        }
        span {
          margin-left: 0.3rem;
        }
      }
    }
  }
</style>
