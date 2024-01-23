<template>
  <div class="cart-body">
    <h1>Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Cart is empty</p>
    </div>
    <div v-else>
      <BookItem v-for="item in cartItems" :key="item.id" :book="item" @select="handleSelect" />
    </div>
  </div>
</template>

<style scoped>
  .cart-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

</style>


<script>
import { useCartStore } from '../stores';
import BookItem from '@/components/BookItem.vue'

export default {
  components: { BookItem },
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.items.map(item => {
        return {
          ...item,
          isInCart: true
        };
      });
    }
  },
  methods: {
    handleSelect(book) {
      const store = useCartStore();
      if (book.isInCart) {
        store.removeFromCart(book.key);
      } else {
        store.addToCart(book);
      }
    }
  }
};
</script>