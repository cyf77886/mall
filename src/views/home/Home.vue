<template>
  <div id="home" >
    <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']"
                   @itemChange="itemChange"
                   ref="tabcontrol1"
                   class="tabcontrol"
                   v-show="isTabFixed"
      ></tab-control>
   <scroll class="content"
           ref="scroll"
           :probe-type="3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore"
           :data="showGoodsList">
     <home-swiper :banners="banners"
                  class="home-swiper" @swiperImageLoad="swiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control :titles="['流行','新款','精选']"
                  @itemChange="itemChange"
                  ref="tabcontrol2"
                  ></tab-control>
     <goods-list  :goods="showGoodsList"></goods-list>
   </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import NavBar from "../../components/common/navbar/NavBar";
  import tabControl from "../../components/content/tabControl/tabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";


  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      tabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        reload : 0,
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0,list: []},
          'new': {page:0,list: []},
          'sell': {page:0,list: []},
          // 'current': {page:0,list: []},

        },
        currenttype : 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY : 0
      }
    },
    created() {

      //1 请求多个数据
        this.getHomeMultidatA()
      // getHomeMultidata().then(res => {
      //   // console.log(res);
      //   this.banners = res.data.recommend.list;
      //   // this.banner = res.data.banner;
      //   this.recommends = res.data.recommend.list;
      // })
      //2、请求商品数据
        this.getHomeGood('pop')
        this.getHomeGood('new')
        this.getHomeGood('sell')
          // getHomeGoods('pop',1).then(res => {
          //   console.log('aaa'+res);
          // })

    },
    mounted() {
        //图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh,10)

          //3、监听item图片加载完成
        this.$bus.$on('imgLoad',()=>{
              // console.log('-----');
          // this.$refs.scroll.refresh()
          // location.reload()
            refresh()
        })
        //获取tabcontrol的offsetTop
        //所有组件都有一个属性￥el：用于获取组件中的元素
      // console.log(this.$refs.tabcontrol.$el.offsetTop);



    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    computed:{
      showGoodsList() {
        return this.goods[this.currenttype].list
      }
    },
    methods:{

        /**
         * 事件监听
         *
         // */
 //        debounce(func,delay){
 //          let timer = null
 //          return function (args) {
 //            if(timer)  clearTimeout(timer)
 //            timer = setTimeout(() => {
 //              func.apply(this,args)
 //            },delay)
 //
 //          }
 //        },
        // refresh(){
        //   this.scroll && this.scroll.refresh()
        // },
        itemChange(index) {
          switch (index) {
            case 0:
                this.currenttype = 'pop'
            break
             case 1:
                this.currenttype = 'new'
             break
              case 2:
                this.currenttype = 'sell'
              break
          }
          this.$refs.tabcontrol1.currentIndex = index
          this.$refs.tabcontrol2.currentIndex = index
        },//展示数据图片
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500)

        },//返回按钮
        contentScroll(position){
          // console.log(position);
          //1、判断backTop是否显示
          this.isShowBackTop = -position.y > 1000
          //2.觉得tabControl是否吸顶（position：fixed）
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },//监听位置
        loadMore(){
          // console.log('shangla');
            this.getHomeGood(this.currenttype)
        },//加载更多
            /**
             * 网络请求
             */
        getHomeMultidatA(){
          getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          // this.banner = res.data.banner;
          this.recommends = res.data.recommend.list;
          })
        },
        getHomeGood(type){
            const page = this.goods[type].page + 1

            getHomeGoods(type,page).then(res => {
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page += 1
        // this.goods['current'] = this.goods['pop']
              this.$refs.scroll.finishPullUp()
            })
        },
        swiperImageLoad(){
          //1、判断backTop是否显示
          //2.觉得tabControl是否吸顶（position：fixed）
          // console.log(this.$refs.tabcontrol.$el.offsetTop); 608
          this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop

        }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
      height: 100vh;
  }
    /*@import "../../assets/css/base.css";*/
    .home-nav{
      background-color: palevioletred;
      color: white;
        width: 100%;
      /*position:fixed;*/
      /*left: 0;*/
      /*right: 0;*/
      /*top: 0;*/
      /*z-index: 9;*/

    }
  .home-swiper{
    position: absolute;
    /*padding-top: 44px;*/
  }

    /*.content{*/
    /*    !*height: calc(100vh - 93px);*!*/
    /*    !*height:300px;*!*/
    /*    overflow: hidden;*/

    /*}*/
  .content{
      height: calc(100% - 88px );
      overflow: hidden;
      /*overflow: hidden;*/
      /*position:absolute;*/
      /*left: 0;*/
      /*right: 0;*/
      /*top: 44px;*/
      /*bottom: 49px;*/
  }
  .tabcontrol{
      background-color: white;
      position: relative;
      z-index: 9

  }
  /*#home {*/
  /*    padding-top: 44px;*/
  /*    !* height: 44px;*/
  /*    相对定位 *!*/
  /*    position: relative;*/
  /*    !* z-index: 9; *!*/
  /*    height: 100vh;*/
  /*}*/
  /*.home-nav {*/
  /*    background-color: #ff8198;*/
  /*    color: #fff;*/
  /*    !*显示上面顶部内容固定不覆盖 *!*/
  /*    !* 使用浏览器原生滚动时，为了不使导航一起滚动 *!*/
  /*    position: fixed;*/
  /*    left: 0;*/
  /*    right: 0;*/
  /*    top: 0;*/
  /*    !* overflow: hidden; *!*/
  /*    z-index: 9;*/
  /*}*/
  /*.tabcontrol {*/
  /*    position: relative;*/
  /*    !*background-color: white;*!*/
  /*    z-index: 9;*/
  /*    !* overflow: hidden; *!*/
  /*}*/
  /*!* 中间距离 *!*/
  /*.content {*/
  /*    height: 300px;*/
  /*    !* overflow: hidden;*!*/
  /*    position: absolute;*/
  /*    !* 上面购物车是44，下面tabbar是49，左右为0 *!*/
  /*    top: 44px;*/
  /*    bottom: 49px;*/
  /*    left: 0;*/
  /*    right: 0;*/
  /*}*/
</style>
