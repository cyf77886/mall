<template>
    <div class="cart-list">
        <scroll class="content">
            <cart-list-item
                    v-for="(item,index) in cartList"
                    :item-info="item"
                    :key="index"/>

        </scroll>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Scroll from "../../../components/common/scroll/Scroll";
    import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
      components:{
        Scroll,
        CartListItem
      },
      computed: {
        ...mapGetters(['cartList'])
      }
  }
</script>

<style scoped>
    .content{
        overflow: hidden;
        width: 100%;
        height: calc(100% - 44px - 49px - 44px);
        position: fixed;
        /*z-index:9;*/
        top:44px;
        bottom: 49px;
        right: 0;
        left: 0;
        /*background-color: red;*/
    }
</style>