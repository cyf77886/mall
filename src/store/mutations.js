export default {
  //mutation唯一的目的就是修改state中状态
  //每一个方法尽可能完成的事件比较单一一点
  addCounter(state,payload){
    payload.count++
    // console.log(payload);
  },
  addToCart(state,payload){
    // payload.check = true
    state.cartList.push(payload)
    // console.log(payload);
  }
}