<template>
    <div>
      <img class="index" src="../assets/images/index.png" alt="">
    </div>
</template>

<script>
   import '../assets/scss/CV.scss'
   import '../assets/scss/iconfont/iconfont.css'
   import '../assets/scss/github-markdown.css'
    export default {
        name: '',
        components: {},
        data() {
            return {
                msg: '<span>hello</span>'
            }
        },
        methods: {},
        computed: {},
        watch: {},
        mounted() {
          setTimeout(() => {
            this.$router.push({
              name:'list'
            })
          },2000);
        },
        props: {
            slides: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="scss">

  .index {
    width: 100%;
    background-color: #fff;
    margin-top: 40%;
  }
</style>
