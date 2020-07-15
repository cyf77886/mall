<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"
                        @titleClick="titleClick" :sendIndex="nowPosition"/>
        <scroll class="content" ref="scroll" @scroll="contentScroll"
                :probe-type="3">
            <detail-swiper :top-image="topImages" />
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo"/>
            <detail-param-info ref="params" :paramInfo="paramInfo"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>

        <detail-bottom-bar @addToCart="addToCart"/>
<!--        <toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";
import Toast from "../../components/common/toast/Toast";

import {mapActions} from 'vuex'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Scroll,
      // Toast
    },
    data(){
      return{
        iid : null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        nowPosition: 0,
        isShowBackTop:false,
        // message: '',
        // show: false
      }
    },
    created() {
      //一、保存传入的iid
      this.iid = this.$route.params.iid
      //二、根据出出入的iid请求数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //取出数据
        const data = res.result
        //1 获取顶部轮播图
        this.topImages = res.result.itemInfo.topImages
        //2 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3 创建店铺信息
        this.shop = new Shop(data.shopInfo);
        // console.log(this.shop);
        //4 保存商品详情数据
        this.detailInfo = data.detailInfo
        //5 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6 取出评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      //三 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        setTimeout(() => {
          //这里写方法..
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs);
        },1000)
      })
    },
  // computed:{
  //   sendNow() {
  //     if(-this.themeTopYs[0] < -this.themeTopYs[1]){
  //       return this.sendI = 0
  //     }
  //     if(-this.themeTopYs[0] < -this.themeTopYs[1]){
  //       return this.sendI = 0
  //     }
  //     if(-this.themeTopYs[0] < -this.themeTopYs[1]){
  //       return this.sendI = 0
  //     }
  //     if(-this.themeTopYs[0] < -this.themeTopYs[1]){
  //       return this.sendI = 0
  //     }
  //   }
  // },
  methods: {
        ...mapActions(['addCart']),
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position) {
            const positionY = -position.y

          if( positionY < this.themeTopYs[1]){
            this.nowPosition = 0
          }
          else if(this.themeTopYs[1] <= positionY && positionY< this.themeTopYs[2]){
              this.nowPosition = 1
          }
          else if(this.themeTopYs[2] <= positionY && positionY < this.themeTopYs[3]){
            this.nowPosition = 2
          }
          else if(this.themeTopYs[3] <= positionY){
            this.nowPosition = 3
          }
          if (positionY > 3000){
            this.isShowBackTop = true
          }
          else if (positionY <= 3000){
            this.isShowBackTop = false
          }
      // console.log(positionY);
      },
      backClick(){
      this.$refs.scroll.scrollTo(0,0,100)
      },
      addToCart(){
        //1、获取购物车需要的信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        product.check = true
        //2 将商品添加到购物车 vuex store
        // this.$store.commit('addCart',product)
          this.addCart(product).then(res => {
              // this.show = true;
              // this.message = res;
              // setTimeout(() => {
              //    this.show = false;
              //    this.message = '';
              // },1500)
              this.$toast.show(res,1500)
              // console.log(this.$toast);
          })

        // this.$store.dispatch('addCart',product).then(res => {
        //     console.log(res);
        // })
        //3 添加到购物车成功


      }
  },
}
</script>

<style scoped>
    #detail {
        height: 100vh;
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .detail-nav {
        position: absolute;
        z-index: 9;
        background-color: #eeeeee;
        width: 100%;
    }

    .content {
        /*position: absolute;*/
        /*top: 44px;*/
        /*bottom: 60px;*/
        height: calc(100% - 44px);
    }

    .back-top {
        position: fixed;
        right: 10px;
        bottom: 65px;
    }
</style>