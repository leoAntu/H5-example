<template>
  <div id="app">

    <v-header :seller="seller"></v-header>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!--加载过的路由，不会反复加载网络请求-->
    <keep-alive>
      <router-view :seller="seller"> </router-view>
    </keep-alive>


  </div>
</template>

<script type="text/ecmascript-6">
  import header from "./components/header/header.vue"
  import { urlParse } from './common/js/util'
  const ERR_OK = 0;

  export default {
    name: '',
    components: {
      'v-header': header
    },
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    methods: {

      requestSeller() {
        this.$http.get('/apis/api/seller?id=' + this.seller.id).then(response => {

          if (response.body.errno == ERR_OK) {
            this.seller = Object.assign({}, this.seller, response.body.data);

          }
        }, response => {

          console.log(response)
        });
      }
    },
    computed: {
    },
    watch: {},
    mounted () {
      this.requestSeller();
      let obj = urlParse();
      console.log(obj)
    },
    props: {

    },
    filters: {},
    created () {}
  }
</script>

<style scoped>

  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }

  .tab-item{
    flex: 1;
    text-align: center;
  }

  .router-link-active{
    color: rgb(240,20,20);
  }
</style>
