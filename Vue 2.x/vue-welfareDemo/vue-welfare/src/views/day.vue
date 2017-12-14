<template>
  <div>
    <div class="day bounceInRight" rel="dom">
      <h1>{{data.title}}</h1>
      <div v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {

    },
    data() {
      return {
        content: false
      }
    },
    methods: {
      clearStyle() {
        this.$nextTick(() => {
          var tags = this.$el.getElementsByTagName('img');
          for (let i = 0; i < tags.length; i++) {
            tags[i].removeAttribute('style');
          }
        });
      }
    },
    computed: {},
    watch: {},
    mounted() {

    },
    props: {
      data: {
        type: Object
      }
    },
    filters: {},
    created() {
      this.clearStyle();
    },
  }
</script>

<style>
  .day{
    padding: 50px 10px 20px 10px
  }
  .day p{
    font-size: 0
  }
  .day p img{
    width: 100%;
  }
  .day h1{
    text-align: left;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    margin: 10px 0;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .day h3{
    color: #000000;
    text-align: left;
    padding: 10px 0;
    font-size: 16px;
    font-weight: 700;
  }
  .day ul{
    color: #000000;
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
    font-weight: 400;
  }
  .day ul li{
    line-height: 20px;
    padding: 5px 0;
    -webkit-animation-name: bounceInRight;
    animation-name: bounceInRight;
  }
  .day ul img, .day h2, .day p:nth-last-child(2), .day p:nth-last-child(1),
  .day [target=_blank] img, .day embed {
    display: none;
  }
</style>
