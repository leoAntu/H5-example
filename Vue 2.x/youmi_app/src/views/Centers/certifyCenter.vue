<template>
  <div class="certifyCenter">
    <back :title="'认证中心'"></back>
    <div class="up">
      <div class="banner">
        <div class="banner_left">
          <div class="banner_left_top"><span>信用额度(元)</span></div>
          <div class="banner_left_bottom"><span>{{credits}}</span></div>
        </div>
        <div class="banner_right">
          <img @click="getLoan" class="BTN_LMNQ" src="../../assets/img/certifyCenter/btn_lmnq@2x.png"/>
        </div>
      </div>
      <ul class="certifyList">
        <li class="certifyItem" v-for="item,key in certifyList">
          <div class="certifyItem_left">
            <div class="certifyItem_left_top">
              <div class="icon" :style="{backgroundImage:`url(${item.icon})`}"></div>
              <span>{{item.title}}</span>
            </div>
            <div class="certifyItem_left_bottom">
              <span>{{item.tips}}</span>
            </div>
          </div>
          <div class="certifyItem_right">已完成</div>
        </li>
      </ul>
    </div>
    <div class="down">
      <div class="extraCertifyList">
        <div class="extraCertify_title"><span>完善以下信息有助于授信额度提升</span></div>
        <div class="extraCertify">
          <div class="extraCertify_item" v-for="item in extraCertifyList">
            <div class="extraCertify_item_icon" :style="{backgroundImage:`url(${item.icon})`}"></div>
            <div class="extraCertify_item_right">
              <div class="extraCertify_item_right_title">{{item.title}}</div>
              <div class="extraCertify_item_right_text">已提额</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import back from '../../components/back'
  import {clickAnim} from "../../utils/animate";

  export default {
    name: "certify-center",
    data() {
      return {
        credits: '20,000.00',
        certifyList: [
          {
            title: '实名认证',
            icon: require('../../assets/img/certifyCenter/rz_icon_shiming@2x.png'),
            tips: '人脸识别及身份证扫描认证'
          },
          {
            title: '芝麻认证',
            icon: require('../../assets/img/certifyCenter/rz_icon_zhima@2x.png'),
            tips: '芝麻信用认证芝麻分授权'
          },
          {
            title: '运营商认证',
            icon: require('../../assets/img/certifyCenter/rz_icon_yunyingshang@2x.png'),
            tips: '三大运营商授权认证'
          },
          {
            title: '联系方式',
            icon: require('../../assets/img/certifyCenter/rz_icon_lianxiren@2x.png'),
            tips: '联系地址及联系人认证'
          },
        ],
        extraCertifyList: [
          {
            title: '淘宝认证',
            icon: require('../../assets/img/certifyCenter/rz_icon_taobao_orange@2x.png'),
          },
          {
            title: '账单邮箱认证',
            icon: require('../../assets/img/certifyCenter/rz_icon_mail_blue@2x.png'),
          }
        ]
      }
    },
    methods: {

      /**立马拿钱**/
      getLoan() {
        this.$router.push({
          name: 'borrowCenter',
        });
      },

    },
    components: {
      back
    },
    mounted() {
      clickAnim('BTN_LMNQ')
    }
  }
</script>

<style scoped lang="less">
  .certifyCenter {
    padding-bottom: 0.7rem;
    font-size: 0.3rem;
    .up {
      width: 100%;
      background-color: white;
      margin-top: 1.08rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.3rem;
      .banner {
        width: 92%;
        border-bottom: 0.01rem #d3d5db solid;
        padding: 0.6rem 0;

        display: flex;
        justify-content: space-between;
        .banner_left {

          display: flex;
          flex-direction: column;
          justify-content: center;
          .banner_left_top {
            color: #666667;
          }
          .banner_left_bottom {
            margin-top: 0.1rem;
            font-size: 0.6rem;
            color: #333848;
          }
        }
        .banner_right {

          display: flex;
          align-items: center;
          img {
            width: 1.98rem;
            height: 0.64rem;
            transition: all .2s ease;
            transform-origin: bottom;
          }
        }
      }
      .certifyList {
        width: 92%;
        padding: 0.35rem 0;
        .certifyItem {
          padding: 0.45rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .certifyItem_left {
            .certifyItem_left_top {
              display: flex;
              align-items: center;
              .icon {
                background: center center no-repeat;
                background-size: contain;
                width: 0.42rem;
                height: 0.5rem;
              }
              span {
                margin-left: 0.1rem;
                font-size: 0.36rem;
              }
            }
            .certifyItem_left_bottom {
              margin-top: 0.2rem;
              font-size: 0.28rem;
              color: #979899;
            }
          }
          .certifyItem_right {
            font-size: 0.28rem;
            color: #bababb;
          }
        }
      }
    }
    .down {
      margin-top: 0.2rem;
      width: 100%;
      background-color: white;
      display: flex;
      justify-content: center;
      .extraCertifyList {
        width: 92%;
        padding: 0.6rem 0;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .extraCertify_title {
          color: #979899;
        }
        .extraCertify {
          width: 100%;
          display: flex;
          margin-top: 0.5rem;
          .extraCertify_item {
            width: 50%;
            display: flex;
            align-items: center;
            .extraCertify_item_icon {
              width: 0.6rem;
              height: 0.48rem;
              background: center center no-repeat;
              background-size: contain;
            }
            .extraCertify_item_right {
              margin-left: 0.2rem;
              .extraCertify_item_right_text {
                margin-top: 0.1rem;
                font-size: 0.28rem;
                color: #bababb
              }
            }
          }
        }
      }

    }
  }
</style>
