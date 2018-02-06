<template>
  <div class="login_container">
    <div class="pwdLogin">
      <span @click="toPwdLogin">密码登录</span>
      <img @click="close" class="close" src="../../assets/img/login/close.png"/>
    </div>

    <div class="welcome">
      <span>欢迎您来到富卡</span>
    </div>

    <div class="phoneNum">
      <input ref="phoneNum" type="number" placeholder="请输入您的手机号" pattern="[0-9]*" maxlength="11" v-model="phoneNum">
      <img v-if="phoneNum" @click="clearPhoneNum()" class="clear" src="../../assets/img/login/icon_closed.png"/>
    </div>

    <div class="line"></div>

    <div class="next_step" @click="nextStep">
      <span>下一步</span>
    </div>

    <div class="protocol">
      <div class="checkbox" @click="agreeProtocol">
        <img v-if="isChecked" class="tick" src="../../assets/img/login/icon_Check_on.@2x.png"/>
      </div>
      <div class="protocol_title">
        <span>我已阅读并同意</span><span>《用户协议》</span><span>《信息收集及使用规则》</span>
      </div>
    </div>

  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import { checkPhone } from '../../utils/validate'
  export default {
    data(){
      return{
        phoneNum:this.$route.query.phoneNum,

        isChecked:true,
      }
    },
    methods: {
      /**转到账号密码登录**/
      toPwdLogin(){
        this.$router.push({
          name: 'passwordLogin',
          query:{
            phoneNum:this.phoneNum
          }
        })
      },
      /**关闭**/
      close() {
        window.history.back()
      },
      /**清空输入框**/
      clearPhoneNum(){
        this.phoneNum = ''
      },

      /**勾选<用户协议>**/
      agreeProtocol(){
        this.isChecked ? this.isChecked = false : this.isChecked = true
      },

      /**下一步**/
      nextStep(){
        if (!checkPhone(this.phoneNum)){
          Toast({
            message: '请输入正确的手机号码',
            duration: 1500,
          });
          this.$refs.phoneNum.focus();
        } else if (!this.isChecked){
          Toast({
            message: '请阅读并同意《用户协议》《信息收集及使用规则》',
            duration: 1500,
          });
        } else {
          this.getCode();
        }
      },

      /**获取验证码**/
      getCode(){
        this.$http({
          url:this.$getApi + '/api/user/sendSmsForH5.htm',
          method:'get',
          params:{
            phone:this.phoneNum,
            type:'registerOrSign'
          },
          before(){
            Indicator.open({
              text: '请稍候',
              spinnerType: 'triple-bounce'
            });
          }
        }).then(res=>{
          Indicator.close();

          if (res.body.code===200){
            if (res.body.data.state === '10') {
              this.$router.push({
                name: 'vcodeLogin',
                query:{
                  phoneNum:this.phoneNum
                }
              })
            } else if (res.body.data.state === '20') {
              Toast({
                message: res.body.data.message,
                duration: 1500
              });
            } else {
              Toast({
                message: '验证码发送失败',
                duration: 1500
              });
            }
          } else {
            Toast({
              message: res.body.msg,
              duration: 1500
            });
          }
        }).catch(e=>{
          Indicator.close();
          Toast({
            message: e.body,
            duration: 1500
          })
        })
      },
    },

    /**生命周期**/
    created() {},
    mounted() {
      // this.$refs.phoneNum.focus();
    }
  }
</script>
<style scoped>

  .login_container{
    background-color: white;
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pwdLogin {
    width: 92%;
    margin-top: 0.6rem;
    color: #4089fe;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    height: 0.32rem;
    width: 0.32rem;
  }
  .welcome{
    width: 92%;
    margin-top: 1.04rem;
    color: #333848;
    font-size: 0.48rem;
    text-align: center;
  }
  .phoneNum{
    width: 92%;
    font-size: 0.36rem;
    margin-top: 1.24rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
      .phoneNum input{
        width: 90%;
      }
      ::-webkit-input-placeholder{
        font-size: 0.3rem;
      }
      .clear{
        height: 0.26rem;
        width: 0.26rem;
      }

  .line{
    width: 92%;
    height: 0.01rem;
    margin-top: 0.45rem;
    background-color: #c9d3e0;
  }

  .next_step{
    width: 95%;
    height: 1.22rem;
    margin-top: 1.20rem;
    background: url("../../assets/img/login/btn_sign in.png") center no-repeat;
    background-size: 100% 1.22rem;

    color: white;
    font-size: 0.36rem;

    display: flex;
    justify-content: center;
    line-height: 1.03rem;
  }
  .protocol{
    width: 92%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 0.28rem;
    margin-bottom: 0.8rem;

    font-size: 0.26rem;
    color: #333848;
  }


          .checkbox{
            width: 0.26rem;
            height: 0.26rem;
            border: #333848 solid 0.01rem;
            background-color: white;
            border-radius: 0.04rem;
          }
          .tick{
            width: 0.27rem;
            height: 0.2rem;

            display: flex;
            align-items: center;

            margin-left: 0.03rem;
          }
          .protocol_title{
            margin-left: 0.1rem;
          }
</style>
