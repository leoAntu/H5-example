<template>
    <div class="star" :class="starType">
      <span v-for="item in itemClasses" :class="item" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const ON = "on"
  const OFF = "off"
  const HALF = "half"
  export default {
    name: '',
    components: {},
    data () {
      return {

      }
    },
    methods: {},
    computed: {
      starType(){
        return 'star-' + this.size
      },

      itemClasses(){

        const result = [];

        const point = Math.floor(this.score * 2) / 2
        const isDecimins = point % 1 !== 0

        for (let i = 0;i < Math.floor(point);i++) {
          result.push(ON)
        }

        if (isDecimins) {
          result.push(HALF)
        }

        while (result.length < LENGTH) {
          result.push(OFF)
        }
        console.log(result)

        return result
      }

    },
    watch: {},
    mounted () {

    },
    props: {
      size:{
        type: Number
      },
      score:{
        type: Number
      }
    },
    filters: {},
    created () {}
  }
</script>

<style scoped>
  .star{
    font-size: 0px;
  }
  .star-item{
    display: inline-block;
    margin-right: 5px;

  }

  .star-24 .star-item{
    width: 10px;
    height: 10px;
    background-size: 10px 10px;
    background-repeat: no-repeat;
  }

  .star-24 .on{
    background-image: url("image/star24_on@2x.png");
  }
  .star-24 .off{
    background-image: url("image/star24_off@2x.png");
  }
  .star-24 .half{
    background-image: url("image/star24_half@2x.png");
  }

  .star-36 .star-item{
    width: 15px;
    height: 15px;
    background-size: 15px 15px;
    background-repeat: no-repeat;
  }

  .star-36 .on{
    background-image: url("image/star36_on@2x.png");
  }
  .star-36 .off{
    background-image: url("image/star36_off@2x.png");
  }
  .star-36 .half{
    background-image: url("image/star36_half@2x.png");
  }

  .star-48 .star-item{
    width: 30px;
    height: 30px;
    background-size: 30px 30px;
    background-repeat: no-repeat;
  }

  .star-48 .on{
    background-image: url("image/star48_on@2x.png");
  }
  .star-48 .off{
    background-image: url("image/star48_off@2x.png");
  }
  .star-48 .half{
    background-image: url("image/star48_half@2x.png");
  }


</style>
