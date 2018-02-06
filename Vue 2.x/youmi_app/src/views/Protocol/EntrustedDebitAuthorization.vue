<template>
  <div class="protocol">
    <h3>
      委托代扣款授权书
    </h3>
    <p>
      合同编号：<u class="sign">{{protocolID}}</u>
    </p>
    <p>
      授权方（下称"本人"）：<u class="sign">{{userName}}</u>
    </p>
    <p>
      被授权方：<u>富卡及富卡相关公司（包括但不限于富银弘远（厦门）信息科技有限公司、富银金融信息服务（北京）有限公司等，以下统称"富卡"）</u>
    </p>
    <p>
      鉴于，本人通过富卡平台从资金提供方处获得借款共计人民币<u class="sign">{{amount}}</u>元（大写：<u class="sign">{{upperAmount}}</u>），并签署编号为：<u class="sign">{{protocolID}}</u>的《借款协议》（以下简称"借款协议"）。根据借款协议约定，为保障资金提供方合法权益，本人授权富卡及/或富卡授权主体于还款日当日从本人以下指定的授权账户中准确划扣还款额（包括本金、利息等费用），直至成功扣划为止。
    </p>
    <table border="1">
      <thead>
      <tr>
        <th colspan="4">授权账户信息</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th width="25%">开户名</th>
        <th width="25%"><u class="sign">{{userName}}</u></th>
        <th width="25%">持卡人(个人账户)身份证号 / 法定代表人(企业账户)营业执照号</th>
        <th width="25%"><u class="sign">{{idNo}}</u></th>
      </tr>
      <tr>
        <th width="50%" colspan="2">持卡人手机号</th>
        <th width="50%" colspan="2"><u class="sign">{{phone}}</u></th>
      </tr>
      <tr>
        <th width="25%">开户行</th>
        <th width="25%"><u class="sign">{{bankName}}</u></th>
        <th width="25%">开户账号</th>
        <th width="25%"><u class="sign">{{bankCardNo}}</u></th>
      </tr>
      </tbody>
    </table>
    <p>
      1. 本人保证以上"授权账户信息"中的身份及所提供的信息真实、有效、准确及合法，因本人身份或所提供信息错误而引起的法律后果及损失，由本人自行承担。
    </p>
    <p>
      2. 本人同意在富卡合作的银行开设资金存管账户或委托富卡代为开设资金存管账户，用于借款协议项下资金的支付及划拨。
    </p>
    <p>
      3. 本人同意富卡通过与富卡存在合作关系的银行或/和第三方支付平台，从本人的银行账户中将款项划拨到富卡账户。
    </p>
    <p>
      4.
      本人须在还款日当日（不得迟于上午09：00）或之前将借款协议约定的还款本息款项存入上述银行卡内（如果遇到法定假日或公休日，还款日期不进行顺延。在此情况下，本人必须安排在还款日之前还款）。富卡或其授权主体根据本人应还款金额办理相关扣款转账手续；由于挂失、账户冻结、金额不足等原因造成扣款失败而导致本人损失的，由本人自行承担。
    </p>
    <p>
      5. 本人变更付款授权账户时，须及时通知富卡，并按更换后的账户信息重新签署授权书。因本人未及时办理变更手续而导致的结果，由本人承担。
    </p>
    <p>
      6. 当本人授权账户内的金额不足以支付本人当期应还款项，导致富卡划扣失败时，本人在此同意并不可撤销地授权富卡或其授权主体在本人名下开立的其他银行账户内准确划扣相应款项，富卡对此无需另行通知本人。
    </p>
    <p>
      7. 本人对于富卡在上述委托授权范围所进行的民事行为后果承担相应责任。
    </p>
    <p>
      8. 本人的上述委托行为在委托期限内是不可变更和撤销的。本人同意：委托期限内，富卡有权将委托事项转委托给第三人执行，无需另行通知本人或者经过本人同意。
    </p>
    <p>
      9. 上述委托事项委托权限自本人在富卡平台确认委托之时开始至本人在借款协议项下的债务得到全部清偿之日止。
    </p>
    <p>
      10. 凡因执行本协议或本协议有关的一切争议，均提请衢州仲裁委员会仲裁，并适用其网络仲裁规则（包括适用互联网金融仲裁特别规定条款），衢州仲裁委员会的裁决为终局裁决，对双方具有法律约束力。
    </p>
    <p>
      11.	本人确认以<u class="sign">{{emailAddress?emailAddress:'________________'}}</u>为联络邮箱，为双方之间及涉诉纠纷相关材料送达地址；并以<u class="sign">{{phone?phone:'________________'}}</u>为联络手机号码，为短信通知号码。按本协议约定由任何一方发给其他方的任何通知，应以电子邮件或者短信等形式发出，送至约定邮箱或者手机号码。收件人指定系统接受材料或通知之日，即视为送达和收到之日。如一方需变更联络邮箱或者手机号码的，应当书面通知并得到对方确认。
    </p>
    <p>
      <b>本人已经详细阅读并充分理解本授权书的全部内容，同意按照本授权书约定执行。本人承诺本授权书授权事项为不可撤销之授权，自本人签字或以其他方式确认之日起即生效。</b>
    </p>
    <p>
      授权人签字：<u class="sign">{{userName}}</u>
    </p>
    <p>
      授权时间：<u class="sign">{{authTime}}</u>
    </p>
  </div>
</template>

<script>
  export default {
    name: "entrusted-debit-authorization",
    data() {
      return {
        protocolID: this.$route.query.protocolID,
        userName: this.$route.query.userName,
        amount: this.$route.query.amount,
        upperAmount: this.$route.query.upperAmount,
        idNo: this.$route.query.idNo,
        phone: this.$route.query.phone,
        bankName: this.$route.query.bankName,
        bankCardNo: this.$route.query.bankCardNo,
        authTime: this.$route.query.authTime,
        emailAddress: this.$route.query.emailAddress
      }
    },
    mounted() {
      document.title = '委托代扣款授权书'
    }
  }
</script>

<style scoped lang="less">
  .protocol {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.28rem;
    line-height: 0.42rem;
    padding-bottom: 1rem;

    .sign {
      color: #45403d;
      font-weight: bolder;
    }

    p {
      width: 92%;
      margin-top: 0.32rem;
    }

    h3 {
      width: 92%;
      margin-top: 0.6rem;
    }

    h2 {
      width: 92%;
      line-height: 0.8rem;
      margin-top: 0.3rem;
    }
    table {
      width: 92%;
      margin-top: 0.32rem;
    }
  }
</style>
