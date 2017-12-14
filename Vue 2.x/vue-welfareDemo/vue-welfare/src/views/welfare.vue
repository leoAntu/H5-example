<template>
    <div>
      <header-vue></header-vue>
      <div class="welfare-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">

        <div class="welfare-center">
          <figure v-show="leftData.length > 0" v-for="data in leftData" @click="selectDetails(data.createdAt)">
            <v-img :imgUrl="data.url"></v-img>

          </figure>
        </div>

        <div class="welfare-center">
          <figure v-show="rightData.length > 0" v-for="data in rightData" @click="selectDetails(data.createdAt)">
            <v-img :imgUrl="data.url"></v-img>
          </figure>
        </div>

        <v-loading :show="loadingShow"></v-loading>
        <v-details ref="details" :time="time" :detailsData="detailsData"></v-details>
      </div>
    </div>
</template>

<script>
    import HeaderVue from '../components/header.vue'
    import VImg from '../components/lazyimg.vue'
    import VLoading from '../components/loading.vue'
    import { mapState } from 'vuex'
    import VDetails from './detail.vue'
    import { objectDate } from '../common/js/date';

    export default {
        name: '',
        components: {
          HeaderVue,
          VImg,
          VLoading,
          VDetails
        },
        data() {
            return {
              leftData: [],
              rightData: [],
              busy: false,
              page: 1,
              detailsData: {},
              time: ''
            }
        },
        methods: {
          loadMore() {
            if (this.busy) {
              return;
            }
            this.busy = true;
            this.loadTop();
            this.page++;

          },
          loadTop() {
            this.$store.commit('UPDATE_LOADING', true);
            this.$http.get(`https://gank.io/api/data/福利/20/${this.page}`)
              .then((response) => {
                let left = response.body.results.filter((data, i) => {
                  return (i + 1) % 2 === 1;
                });
                let right = response.body.results.filter((data, i) => {
                  return (i + 1) % 2 !== 1;
                });
                this.leftData = this.leftData.concat(left);
                this.rightData = this.rightData.concat(right);
                console.log(this.leftData);
                console.log(this.rightData);
                this.busy = false;
                this.$nextTick(() => {
                  this.$store.commit('UPDATE_LOADING', false);
                });
              })
          },
          selectDetails(time) {
            console.log('12123123123123');
            this.time = time;
            this.$store.commit('UPDATE_LOADING', true);
            let object = objectDate(this.time);
            this.$http.get(`http://gank.io/api/history/content/day/${object.Y}/${object.M}/${object.D}`).then((response) => {
              let data = response.body.results;
              this.detailsData = data[0];
              this.$refs.details.show();

              this.$nextTick(() => {
                this.$store.commit('UPDATE_LOADING', false);
              });
            });
          }
        },
        computed: {
          ...mapState({
            loadingShow: 'loadingShow'
          })
        },
        watch: {},
        mounted() {
        },
        props: {

        },
        filters: {}
    }
</script>

<style scoped>
  .welfare-wrapper{
    display: flex;
    margin-top: 60px;
  }
  .welfare-center{
    width: 50%;
    column-width: 200px;
    column-gap: 15px;
    max-width: 1100px;
  }
  figure{
    width: 95%;
    background: #fefefe;
    border: 2px solid #fcfcfc;
    height: auto;
    margin: 0 2px 15px;
    display: inline-block;
    column-break-inside: avoid;

  }
  img{
    width: 100%;
    height: auto

  }
</style>
