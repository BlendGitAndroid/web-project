import { computed } from 'vue'
import { useStore } from 'vuex'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList;

  // 调用mutations中的changeCartItemInfo方法
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }
  
  // productList 计算属性依赖于 cartList[shopId]?.productList。当 cartList 或 shopId 变化时，productList 会重新计算。
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}

    const notEmptyProductList = {}
    for(let i in productList) {
      const product = productList[i]
      if(product.count > 0 ) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  // shopName 计算属性依赖于 cartList[shopId]?.shopName。当 cartList 或 shopId 变化时，shopName 会重新计算。
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // calculations 计算属性依赖于 cartList[shopId]?.productList。当 cartList 或 shopId 变化时，calculations 会重新计算。
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true}
    if(productList) {
       for(let i in productList) {
         const product = productList[i]
         result.total += product.count
         if(product.check) {
           result.price += (product.count * product.price)
         }
         if(product.count > 0 && !product.check) {
           result.allChecked = false
         }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, shopName, productList, calculations, changeCartItemInfo }
}