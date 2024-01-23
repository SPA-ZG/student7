<template>
  <div class="book-item">
    <h3>{{ book.title }} - {{ book.author_name === undefined ? "unknown" : book.author_name[0] }}</h3>
    <img :src="book.cover_edition_key ? 'http://covers.openlibrary.org/b/olid/' + book.cover_edition_key + '-M.jpg' : 'https://via.placeholder.com/180x250'"  :alt="book.title">
    <button @click="selectBook" v-show="!book.isInCart">Add to Wishlist</button>
    <button @click="selectBook" v-show="book.isInCart">Remove from Wishlist</button>
  </div>
</template>

<style scoped>
  .book-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    h3 {
      text-align: center;
    }

    button {
      padding: 0.5rem;
      font-size: 1rem;
      background-color: #C9B8D8;
      border: 1px solid #C9B8D8;
      border-radius: 0.25rem;
      color: #fff;
    }
  }
</style>

<script>
export default {
  props: ['book'],
  methods: {
    selectBook() {
      this.$emit('select', this.book);
    }
  }
};
</script>