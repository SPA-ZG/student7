<template>
  <div class="book-item">
    <router-link :to="{ name: 'book', params: { id: book.key.split('/')[2] } }">
      <h3>{{ book.title }} - {{ book.author_name[0] }}</h3>
      <img :src="book.cover_edition_key ? 'http://covers.openlibrary.org/b/olid/' + book.cover_edition_key + '-M.jpg' : 'https://via.placeholder.com/180x250'"  :alt="book.title">
    </router-link>
    <button @click="selectBook" v-show="!book.isInCart">Add to Cart</button>
    <button @click="selectBook" v-show="book.isInCart">Remove from Cart</button>
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

    a {
      text-decoration: none;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      h3 {
        text-align: center;
      }
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