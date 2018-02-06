<template>
  <div>
    <!--<transition name="fade" mode="out-in">-->
      <keep-alive>
        <component v-if="active==='page-loan'||active==='page-mine'" :is="active"></component>
      </keep-alive>
    <!--</transition>-->
    <!--<transition name="fade" mode="out-in">-->
      <component v-if="active==='page-bill'" :is="active"></component>
    <!--</transition>-->
    <NavBar></NavBar>
  </div>
</template>

<script>
  import {BaiduTongji} from "../utils/BaiduTongji";
  import NavBar from '../components/nav'
  import pageLoan from './TabPages/loan'
  import pageBill from './TabPages/bill'
  import pageMine from './TabPages/mine'

  export default {
    components: {
      NavBar,
      pageLoan,
      pageBill,
      pageMine,
    },
    computed: {
      /**接收state中active的状态 改变展示的页面**/
      active() {
        return this.$store.state.active
      }
    },
    mounted() {
      BaiduTongji();
    }
  }
</script>

<style scoped>

</style>
