<template>
  <div>
    <header-vue></header-vue>
    <div class="vvheader">
      sdfsdfsdf
    </div>

  </div>
</template>

<script>
  import HeaderVue from '../components/header.vue'
  export default {
    name: '',
    components: {
      HeaderVue
    },
    data() {
      return {
        msg: '<span>hello</span>'
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
    filters: {}
  }
</script>

<style scoped>
  .vvheader{
    margin-top: 100px;
    background-color: red;
    width: 200px;
    height: 200px;
  }
</style>
