<template>
<div id="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
    </nav-bar>
<!--    商品列表-->
    <cart-list class="cart-list"/>
<!--    底部汇总-->
    <cart-bottom-bar/>

</div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
        // ...mapGetters(['cartLength'])
        ...mapGetters({
            length:"cartLength"
        })
    }
  }
</script>

<style scoped>
    #cart{
        width: 100%;
       height: 100vh;
    }
    .nav-bar {
        background-color: var(--color-tint);
        color: white;
        font-weight: 700;
        width: 100%;
    }
    .cart-list {
        position: absolute;
        top: 44px;
        /*bottom: 49px;*/
        width: 100%;
    }
    /*.bottom-bar {*/
    /*    position: absolute;*/
    /*    top: 149px;*/
    /*    bottom: 79px;*/
    /*    background-color: red;*/
    /*}*/
</style>
