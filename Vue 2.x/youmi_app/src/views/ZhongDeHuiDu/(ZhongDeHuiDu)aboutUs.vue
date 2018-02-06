<template>
  <div class="aboutUs">
    <img class="logo" src="../../assets/img/aboutUs/logo_fuka@2x.png"/>
    <span class="copyright_part1">青岛市城阳区中德汇都小额贷款有限公司 版权所有</span>
    <span class="copyright_part2">@Copyright @2018 All Rights Reserved</span>
    <div class="text">
      <p class="paragraph" style="text-indent: 2em">
        富卡是中德汇都旗下的为用户打造的一个极速金融借贷平台，用户可以在这里快速申请借款，放款快捷，为用户轻松解决资金问题。
      </p>
    </div>
    <div class="title">
      <img src="../../assets/img/aboutUs/left@2x.png" height="4" width="96"/>
      <span>公司介绍</span>
      <img src="../../assets/img/aboutUs/right@2x.png" height="4" width="96"/>
    </div>
    <div class="text">
      <p class="paragraph">
        <b>青岛市城阳区中德汇都小额贷款有限公司</b>（以下称“中德汇都”）成立于2017年4月，是一家以大数据技术为驱动的金融科技公司。公司总部位于厦门，在北京、深圳、青岛等城市设有分支机构，服务覆盖全国。
      </p>
      <p class="paragraph">
        中德汇都旨在充分发挥股东价值，发展互联网金融平台作用，通过应用场景互联网化、服务互联网化、运营互联网化的模式设置，运用独特的反欺诈规则与大数据模型双引擎的风险控制手段，以及具备良好用户体验的产品设计，使公司成为技术驱动的、领跑中国市场的金融科技公司。
      </p>
      <p class="paragraph">
        作为涉入大数据金融科技领域的企业之一，凭借整合多维度海量数据、以及强大的大数据处理和建模能力，为消费借款机构及个人用户提供借款服务，利用成熟的量化方法及金融经验，帮助个人及小微企业证明经济财务等状况，从而快速获得低成本借款服务，实现低息快速融资的大众普惠金融。
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about-us"
  }
</script>

<style scoped lang="less">
  .aboutUs{
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo{
      height: 1.39rem;
      width: 1.39rem;
      margin-top: 0.6rem;
    }
    .copyright_part1{
      font-size: 0.24rem;
      color: #979899;
      margin-top: 0.4rem;
    }
    .copyright_part2{
      color: #979899;
      font-size: 0.2rem;
      margin-top: 0.1rem;
    }
    .title{
      color: #666667;
      font-size: 0.3rem;
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
      span{
        margin: 0 0.2rem;
      }
    }
    .text{
      width: 92%;
      margin-top: 0.6rem;
      font-size: 0.3rem;
      color: #666667;
      line-height: 0.5rem;
      .paragraph{
        margin-bottom: 0.5rem;
      }
    }
  }
</style>
