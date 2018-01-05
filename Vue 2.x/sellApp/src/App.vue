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

    <router-view> </router-view>


  </div>
</template>

<script type="text/ecmascript-6">
  import header from "./components/header/header.vue"

  const ERR_OK = 0;

  export default {
    name: '',
    components: {
      'v-header': header
    },
    data () {
      return {
        seller: null
      }
    },
    methods: {

      requestSeller() {

        this.$http.get('/apis/api/seller').then(response => {

          if (response.body.errno == ERR_OK) {
            this.seller = response.body.data

          }
        }, response => {

          console.log(response)
        });
      }
    },
    computed: {},
    watch: {},
    mounted () {
      this.requestSeller();

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
