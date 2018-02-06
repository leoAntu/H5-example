<template>
  <div class="login_container">
    <div class="back">
      <img @click="getBack" src="../../assets/img/login/icon_back@2x.png"/>
    </div>

    <div class="welcome">
      <span>已发送验证码到</span>
      <span class="phoneNum_sentTo">{{phoneNum}}</span>
    </div>

    <div class="vcode">
      <input ref="vcode" type="number" pattern="[0-9]*" maxlength="4" v-model="vcode">
    </div>

    <div class="line"></div>

    <div class="text_container">
      <span @click="getVoiceCode">发送语音验证码</span>
      <span @click="getCode">获取验证码</span>
    </div>

    <div class="login" @click="nextStep">
      <span>立马拿钱</span>
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
  import moment from 'moment';
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import hex_md5 from '../../utils/md5'
  export default {
    data(){
      return{
        phoneNum:this.$route.query.phoneNum,
        vcode:'',

        isChecked:true,
      }
    },
    methods: {
      /**后退**/
      getBack(){
        window.history.back()
      },

      /**勾选<用户协议>**/
      agreeProtocol(){
        this.isChecked ? this.isChecked = false : this.isChecked = true
      },

      /**进入立马有钱**/
      nextStep(){
        if (!this.vcode){
          Toast({
            message: '请输入正确的验证码',
            duration: 1500,
          });
          this.$refs.vcode.focus();
        } else if (!this.isChecked){
          Toast({
            message: '请阅读并同意《用户协议》《信息收集及使用规则》',
            duration: 1500,
          });
        } else {
          this.login();
        }
      },

      /**登录**/
      login(){
        let UserAgent = navigator.userAgent;
        let isAndroid = UserAgent.indexOf("Android");
        let clientType = isAndroid > 0 ? 'android' : 'ios' ;

        let date = new Date();
        let time = moment(date).format('YYYYMMDDHHmmss');

        this.$http({
          url:this.$getApi + '/api/user/h5RegisterOrSign.htm',
          method:'post',
          headers:{
            'isH5':'1',
            'time':time,
            'signMsg':hex_md5(`90431FAC56A2BA40AE7BB7FE5339AA9Bclient=${clientType}|loginName=${this.phoneNum}|vcode=${this.vcode}${time}`).toUpperCase(),
          },
          params:{
            loginName:this.phoneNum,
            vcode:this.vcode,
            client:clientType
          },
          before(){
            Indicator.open({
              text: '请稍候',
              spinnerType: 'triple-bounce'
            });
          },
        }).then(res=>{
          Indicator.close();
          if (res.body.code === 200){
            /**修改state.userInfo.userId**/
            this.$store.commit('updateUserInfo',res.body.data.userId);
            /**修改state.isLogin = true**/
            this.$store.commit('updateIsLogin', true);

            this.$router.push({
              name: 'layout',
            })

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
              Toast({
                message: '验证码发送成功',
                duration: 1500
              });
            } else if (res.body.data.state === '20') {
              /**手机号不正确、频率太高、超限次数**/
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

      /**获取语音验证码**/
      getVoiceCode(){
        alert('获取语音验证码')
      }
    },

    /**生命周期**/
    created() {},
    mounted() {
      // this.$refs.vcode.focus();
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
  .back {
    width: 92%;
    margin-top: 0.6rem;
    color: #4089fe;
    font-size: 0.3rem;
  }
  .back img{
    width: 0.16rem;
    height: 0.3rem;
  }
  .welcome{
    width: 92%;
    margin-top: 1.04rem;
    color: #333848;
    font-size: 0.48rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
          .phoneNum_sentTo{
            margin-top: 0.1rem;
            font-size: 0.3rem;
            color: #666666;
          }
  .vcode{
    width: 92%;
    font-size: 0.5rem;
    margin-top: 0.76rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
          .vcode input{
            width: 100%;

            text-align: center;
            text-indent: 0.35rem;
            letter-spacing: 0.35rem;
          }

  .line{
    width: 92%;
    height: 0.01rem;
    margin-top: 0.45rem;
    background-color: #c9d3e0;
  }

  .text_container{
    width: 92%;
    margin-top: 0.4rem;
    color: #333848;

    display: flex;
    justify-content: space-between;
  }

  .login{
    width: 95%;
    height: 1.22rem;
    margin-top: 0.55rem;
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
