<template>
    <div>
      <!-- 全局header -->
      <nv-head :pageType='getTitleStr(searchKey.tab)'
               ref="head"
               :fix-head="true"
               :need-add="true">
      </nv-head>

      <section id="page">
        <!-- 首页列表 -->
        <ul class="posts-list">
          <li v-for="item in topics" :key="item.id">
            <router-link :to="{name:'topic',params:{id:item.id}}">
              <h3 v-text="item.title"
                  :class="getTabInfo(item.tab, item.good, item.top, true)"
                  :title="getTabInfo(item.tab, item.good, item.top, false)">
              </h3>
              <div class="content">
                <img class="avatar" :src="item.author.avatar_url" />
                <div class="info">
                  <p>
                                <span class="name">
                                    {{item.author.loginname}}
                                </span>
                    <span class="status" v-if="item.reply_count > 0">
                                    <b>{{item.reply_count}}</b>
                                    /{{item.visit_count}}
                                </span>
                  </p>
                  <p>
                    <time>{{item.create_at | getLastTimeStr(true)}}</time>
                    <time>{{item.last_reply_at | getLastTimeStr(true)}}</time>
                  </p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </section>

      <nv-top></nv-top>
    </div>
</template>

<script>

  import nvHead from '../components/header.vue';
  import utils from '../libs/utils';
  import $ from 'webpack-zepto'
  import nvTop from '../components/backtotop.vue';

    export default {
        name: '',
        components: {
          nvHead,
          nvTop
        },
        data() {
            return {
              scroll: true,
              topics: [],
              index: {},
              searchKey: {
                page: 1,
                limit: 20,
                tab: 'all',
                mdrender: true
              },
              searchDataStr: ''
            }
        },
        methods: {
          // 获取主题数据
          getTopics() {
            let params = $.param(this.searchKey);
            $.get('https://cnodejs.org/api/v1/topics?' + params, (d) => {
              this.scroll = true;
              if (d && d.data) {
                d.data.forEach(this.mergeTopics);
              }
            });
          },
          mergeTopics(topic) {
            if (typeof this.index[topic.id] === 'number') {
              const topicsIndex = this.index[topic.id];
              this.topics[topicsIndex] = topic;
            } else {
              this.index[topic.id] = this.topics.length;
              this.topics.push(topic);
            }
          },
          getScrollData () {
            console.log('getScrollData 0---------');

            if (this.scroll) {
              let totalheight = parseInt($(window).height()) + parseInt($(window).scrollTop());
              if ($(document).height() <= totalheight + 200) {

                this.scroll = false;
                this.searchKey.page += 1;
                console.log('getScrollData 111---------' + this.searchKey.page);

                this.getTopics();
              }
            }
          },
          getTabInfo () {

          },
          getTitleStr (tab) {
            let str = '';
            switch (tab) {
              case 'share':
                str = '分享';
                break;
              case 'ask':
                str = '问答';
                break;
              case 'job':
                str = '招聘';
                break;
              case 'good':
                str = '精华';
                break;
              default:
                str = '全部';
                break;
            }
            return str;
          }
        },
        computed: {},
        watch: {
          // 切换页面
          '$route' (to, from) {
            console.log('watch--------------------');
            // 如果是当前页面切换分类的情况
            if (to.query && to.query.tab) {
              this.searchKey.tab = to.query.tab;
              this.topics = [];
              this.index = {};
            }
            this.searchKey.page = 1;
            this.getTopics();
            // 隐藏导航栏
            this.$refs.head.show = false;
          }
        },
        mounted() {
          console.log('mounted---------------------');
          if (this.$route.query && this.$route.query.tab) {
            this.searchKey.tab = this.$route.query.tab;
          }

          if (window.window.sessionStorage.searchKey && window.window.sessionStorage.tab === this.searchKey.tab) {
            this.topics = JSON.parse(window.window.sessionStorage.topics);
            this.searchKey = JSON.parse(window.window.sessionStorage.searchKey);
            this.$nextTick(() => $(window).scrollTop(window.window.sessionStorage.scrollTop));
          } else {
            this.getTopics();
          }

          // 滚动加载
          $(window).on('scroll', utils.throttle(this.getScrollData, 300, 1000));
        },
        props: {

        },
      beforeRouteLeave(to, from, next) {
        // 如果跳转到详情页面，则记录关键数据
        // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
        $(window).off('scroll');
        console.log('leave----------------');
        if (to.name == 'topic') {
            //当前滚动位置
            window.window.sessionStorage.scrollTop = $(window).scrollTop();
          // 当前页面主题数据
            window.sessionStorage.topics = JSON.stringify(this.topics);
          // 查询参数
          window.window.sessionStorage.searchKey = JSON.stringify(this.searchKey);
          // 当前tab
          window.window.sessionStorage.tab = from.query.tab || 'all';
        }
        next();

      },
      beforeRouteEnter(to, from, next) {
        console.log('enter----------------');
        if (from.name !== 'topic') {
          if (window.window.sessionStorage.tab) {
            window.window.sessionStorage.removeItem('scrollTop');
            window.window.sessionStorage.removeItem('topics');
            window.window.sessionStorage.removeItem('searchKey');
            window.window.sessionStorage.removeItem('tab');
          }
        }
        next();
      },
//      filters: {
//        getLastTimeStr(time, isFromNow) {
//          return '1min'
//        }
//      }
    }
</script>

<style scoped>

</style>
