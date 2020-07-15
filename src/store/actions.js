export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      //判断新添加的商品信息
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2 判断oldProduct
      if (oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量加1')
      }
      else{
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加当前商品')
      }
    })
  }

}