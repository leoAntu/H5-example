<template>
  <div class="advertise">
    <img class="flag1" src="../../assets/img/advertise/20180105/newbies_flag1.png" />
    <img class="flag2" src="../../assets/img/advertise/20180105/newbies_flag2.png" />
  </div>
</template>

<script>
  import {BaiduTongji} from "../../utils/BaiduTongji";
  import {wxShare} from "../../utils/wxConfig";

  export default {
    name: "ad_newbies-welfare_20180105",
    mounted() {
      BaiduTongji();
      wxShare({
        title: '新手福利任性送，还不快来抢？！',
        link: 'https://apps.limayq.com/ad_NewbiesWelfare_20180105', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://bucket-fuyin-limayq-beijing.oss-cn-beijing.aliyuncs.com/liuliang_logo.png', // 分享图标
        desc: '新手福利，百兆流量等你拿', // 分享描述
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      });
    }
  }
</script>

<style scoped lang="less">

  .advertise {
    width: 100%;
    min-height: 100vh;
    background: url("../../assets/img/advertise/20180105/newbies_bg.jpg") top center no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    .flag1 {
      width: 92%;
      margin-top: 3.7rem;
    }
    .flag2 {
      width: 92%;
      margin-top: 0.4rem;
      margin-bottom: 0.63rem;
    }
  }

</style>
