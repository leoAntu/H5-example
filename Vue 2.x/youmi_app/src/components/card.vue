<template>
  <div class="cardContainer">
    <div class="card" @click="showUp">
      <div class="card_content">
        <div class="card_left">
          <div class="card_up">
            <img :src="require('../assets/img/card/jk_icon_bank_zhaoshang.png')">
            <span>{{bankName}}</span>
          </div>
          <div class="card_down">
            <span>{{cardNum}}</span>
          </div>
        </div>
        <div class="card_right">
          <img class="chip" src="../assets/img/card/chip@2x.png"/>
        </div>
      </div>
    </div>
    <div class="cover" style="display: none;"></div>
  </div>
</template>

<script>
  export default {
    name: "card",
    data() {
      return {
        isShowUp: false,
        bankName: '招商银行',
        cardNum: '3011 ******** 256'
      }
    },
    methods: {
      showUp() {
        if (!this.isShowUp) {
          $('.card').removeClass('hideIn').addClass('showUp');
          this.isShowUp = true;
          $('.cover').css('display', 'block');
          setTimeout(() => {
            $('.cover').css('background-color', 'rgba(0,0,0,0.5)')
          }, 500)
        } else {
          $('.card').removeClass('showUp').addClass('hideIn');
          this.isShowUp = false;
          $('.cover').css('background-color', 'rgba(0,0,0,0)');
          setTimeout(() => {
            $('.cover').css('display', 'none')
          }, 500)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .cardContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;

    .cover {
      width: 100%;
      height: 100vh;
      position: absolute;
      background-color: rgba(0, 0, 0, 0);
      z-index: 3;
      transition: all .5s ease;
    }
  }

  .card {
    width: 92vw;
    height: 3.89rem;
    border-radius: 0.1rem;
    background: url("../assets/img/card/bk_bg_bankcard_big.png") center center no-repeat;
    background-size: 100% auto;
    position: absolute;
    top: 2.08rem;
    z-index: 1;
    box-shadow: 0 0.03rem 0.12rem 0 #666666;

    color: white;
    font-size: 0.36rem;

    display: flex;
    justify-content: center;

    transform-origin: top;
    transform: scale(0.8,0.8);
    .card_content {
      width: 80.8vw;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .card_left {
        .card_up {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          img {
            width: 0.62rem;
            height: 0.61rem;
          }
          span {
            margin-left: 0.2rem;
          }
        }
        .card_down {
          font-size: 0.54rem;
          display: flex;
          margin-top: 0.4rem;
        }
      }
      .card_right {
        align-self: center;
        .chip {
          width: 1.02rem;
          height: 0.74rem;
        }
      }
    }
  }

  .showUp {
    -webkit-animation: showUp 1s ease 0s 1 normal;
    -o-animation: showUp 1s ease 0s 1 normal;
    animation: showUp 1s ease 0s 1 normal;
    top: 30vh;
    z-index: 4;

    transform-origin: top;
    transform: scale(1,1);
  }

  .hideIn {
    -webkit-animation: hideIn 1s ease 0s 1 normal;
    -o-animation: hideIn 1s ease 0s 1 normal;
    animation: hideIn 1s ease 0s 1 normal;
    top: 2.08rem;
    z-index: 1;

    transform-origin: top;
    transform: scale(0.8,0.8);
  }

  @keyframes showUp {
    from {
      top: 2.08rem;
      z-index: 1;
      transform-origin: top;
      transform: scale(0.8,0.8);
    }
    40% {
      top: 0.8rem;
      transform-origin: top;
      transform: scale(0.8,0.8);
    }
    to {
      transform-origin: top;
      transform: scale(1,1);
      z-index: 4;
      top: 30vh;
    }
  }

  @keyframes hideIn {
    from {
      z-index: 4;
      top: 30vh;
      transform-origin: top;
      transform: scale(1,1);
    }
    60% {
      top: 0.8rem;
      transform-origin: top;
      transform: scale(0.8,0.8);
      z-index: 4;
    }
    65% {
      z-index: 1;
    }
    to {
      transform-origin: top;
      transform: scale(0.8,0.8);
      top: 2.08rem;
      z-index: 1;
    }
  }
</style>
