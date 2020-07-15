<template>
  <div class="bottom-bar">
    <div class="check-content"
         @click="allChoose">
      <check-button  class="check-button" :is-check="Check"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="check">
      去结算：({{checkLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data(){
      return {
        isChoose: 1,
        // isCheck: true
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.check
        }).reduce((preValue,item) => {
          // console.log(item);
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        // return this.$store.state.cartList.filter(item => item.check).length
        return this.$store.state.cartList.filter(item => {
          return item.check
        }).reduce((preValue,item) => {
          return preValue + item.count
        },0)
      },
      Check(){
        if(this.$store.state.cartList.length === 0) {
          return false
        }
        if(this.$store.state.cartList.find(item => !item.check)){
          this.isChoose = 2
          return false
        }
        return !this.$store.state.cartList.find(item => !item.check)
      }
    },
    methods:{
      allChoose(){
        if(this.isChoose%2 === 0){
          for(let i =0 ; i< this.$store.state.cartList.length ; i++){
            this.$store.state.cartList[i].check = true
          }
        }
        else {
          for(let i =0 ; i< this.$store.state.cartList.length ; i++){
            this.$store.state.cartList[i].check = false
          }
        }
        this.isChoose ++
      },
      check(){
        if(this.$store.state.cartList.length === 0){
          this.$toast.show('当前没有商品！',1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 44px;
    background-color: #eeeeee;
    position: fixed;
    bottom: 49px;
    display: flex;
    align-items: center;
    line-height: 40px;
    font-size: 18px;
  }
  .check-content{
    height: 44px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    width: 90px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
    align-items: center;
  }
  .price {
    flex: 1;
  }
  .calculate {
    background-color: pink;
    width: 120px;
    text-align: center;
    color: white;
    align-items: center;
  }
</style>