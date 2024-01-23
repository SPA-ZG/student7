<template>
  <div v-if="!!book">
      <book-item :book="book" :is-detailed />
  </div>
</template>

<script>
import { useCartStore } from '../stores';
import BookItem from '@/components/BookItem.vue'

export default {
  components: { BookItem },
  data() {
    return {
      book: null
    };
  },
  methods: {
    addToCart() {
      const cartStore = useCartStore();
      cartStore.addToCart(this.book);
    }
  },
  mounted() {
    const cartStore = useCartStore();
    fetch("http://localhost:8000/book/"+this.$route.params.id)
      .then(res => res.json())
      .then(book => {
        this.book = {
          ...book,
          isInCart: cartStore.isInCart(book.key)
        }
      });
  }
};
</script>