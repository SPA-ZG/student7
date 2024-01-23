<template>
  <div class="book-grid">
    <book-item
      v-for="book in booksWithCartState"
      :key="book.id"
      :book="book"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.book-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 4rem;
}
</style>

<script>
import BookItem from '@/components/BookItem.vue'
import { useCartStore } from '@/stores/index.js'

export default {
  props: ['books'],
  components: { BookItem },
  computed: {
    booksWithCartState() {
      const cartStore = useCartStore()
      return this.books.map((book) => {
        return {
          ...book,
          isInCart: cartStore.isInCart(book.key)
        }
      })
    }
  },
  methods: {
    handleSelect(book) {
      const store = useCartStore()
      if (book.isInCart) {
        store.removeFromCart(book.key)
      } else {
        store.addToCart(book)
      }
    }
  }
}
</script>
