import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    getCart() {
      return this.items
    },
    addToCart(item) {
      this.items.push(item)
    },
    removeFromCart(itemId) {
      this.items = this.items.filter((item) => item.key !== itemId)
    },
    clearCart() {
      this.items = []
    },
    isInCart(itemId) {
      return this.items.some((item) => item.key === itemId)
    }
  }
})
