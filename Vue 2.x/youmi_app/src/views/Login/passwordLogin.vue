<template>
  <div class="login_container">
    <div class="vcodeLogin">
      <span @click="toVcodeLogin">手机快速登录</span>
      <img @click="close" class="close" src="../../assets/img/login/close.png"/>
    </div>

    <div class="welcome">
      <span>您正在使用账号密码登录</span>
    </div>

    <div class="phoneNum">
      <input ref="phoneNum" type="number" placeholder="请输入您的登录账号" pattern="[0-9]*" maxlength="11" v-model="phoneNum">
      <img v-if="phoneNum" @click="clearPhoneNum()" class="clear" src="../../assets/img/login/icon_closed.png"/>
    </div>

    <div class="line"></div>

    <div class="password">
      <input ref="password" :type="inputType" placeholder="请输入您的登录密码" v-model="password">
      <img v-if="password" @click="showPassword()" class="showPassword" src="../../assets/img/login/icon_visual@2x.png"/>
    </div>

    <div class="line"></div>

    <div class="forget">
      <span @click="forget">忘记密码？</span>
    </div>

    <div class="next_step" @click="nextStep">
      <span>立马拿钱</span>
    </div>

  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import { checkPhone } from '../../utils/validate'
  export default {
    data(){
      return{
        phoneNum:this.$route.query.phoneNum,
        password:'',
        inputType:'password',
      }
    },
    methods: {
      /**转到账号密码登录**/
      toVcodeLogin(){
        this.$router.push({
          name: 'getCode',
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

      /**查看密码**/
      showPassword(){
        this.inputType === 'password' ? this.inputType = 'text' : this.inputType = 'password'
      },

      /**下一步**/
      nextStep(){
        if (!checkPhone(this.phoneNum)){
          Toast({
            message: '请输入正确的手机号码',
            duration: 1500,
          });
          this.$refs.phoneNum.focus();
        }
        else if (!this.password){
          Toast({
            message: '请输入您的登录密码',
            duration: 1500,
          });
          this.$refs.password.focus();
        }
        else {
          this.login();
        }
      },

      /**登录**/
      login(){
        MessageBox({
          title: '登录错误',
          message: '账号或密码错误，请重新输入',
          showCancelButton: false
        }).then(()=>{
          this.phoneNum = '';
          this.password = '';
        });
      },

      /**忘记密码**/
      forget(){
        alert('忘记密码');
      }
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
  .vcodeLogin {
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

  .password{
    width: 92%;
    font-size: 0.36rem;
    margin-top: 0.45rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
          .password input{
            width: 90%;
          }
          ::-webkit-input-placeholder{
            font-size: 0.3rem;
          }

          .showPassword{
            width: 0.33rem;
            height: 0.2rem;
          }

  .forget{
    width: 92%;
    font-size: 0.28rem;
    color: #333848;
    margin-top: 0.4rem;

    display: flex;
    justify-content: flex-end;
  }

  .next_step{
    width: 95%;
    height: 1.22rem;
    margin-top: 0.54rem;
    margin-bottom: 0.8rem;
    background: url("../../assets/img/login/btn_sign in.png") center no-repeat;
    background-size: 100% 1.22rem;

    color: white;
    font-size: 0.36rem;

    display: flex;
    justify-content: center;
    line-height: 1.03rem;
  }
</style>
