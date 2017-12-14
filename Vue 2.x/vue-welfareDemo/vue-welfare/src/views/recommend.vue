<template>
  <div>
    <header-vue ></header-vue>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="slide in swiperSlides">
        <v-day :data="slide"></v-day>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

  </div>
</template>

<script>
  import HeaderVue from '../components/header.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import VDay from './day.vue'
  const TAB_NAME = ['今天', '昨天', '前天', '三天前', '四天前'];

  export default {
    name: '',
    components: {
      HeaderVue,
      VDay
    },
    data() {
      return {
        swiperSlides: [],
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          paginationBulletRender(swiper, index, className) {
            return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
          }
        }
      }
    },
    methods: {},
    computed: {},
    watch: {},
    mounted() {

    },
    props: {
      slides: {
        type: Array,
        default: []
      }
    },
    filters: {},
    created() {
      this.$store.commit('UPDATE_LOADING', true);
      this.$http.get('http://gank.io/api/history/content/5/1').then((response) => {
        this.swiperSlides = response.body.results;
        console.log(this.swiperSlides);
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LOADING', false);
        });
      });
    }
  }
</script>

<style>

  .swiper-pagination{
    position:absolute;
    top:0;
    height:50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width:100%;
    overflow: hidden;
  }
  .swiper-pagination-bullet-custom{
    width: 100% !important;
    height: 100% !important;
    margin:0 !important;
    text-align: center;
    line-height: 50px;
    color: #999999;
    border-radius: 0 !important;
    background: #fff !important;
    opacity: 1 !important;
  }
  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #03a9f4;
    background: #03a9f4;
    font-size: 20px

  }

  .swiper{
    margin-top: 50px;
  }


</style>
