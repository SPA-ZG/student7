<template>
  <div>
    <div class="input-box">
      <input type="search" v-model="searchQuery" @input="debouncedInputHandler" placeholder="Search books...">
      <button>Search</button>
    </div>
    <div v-if="!!searchQuery">
      <div class="header-text" v-if="loading">
        <h2>Loading...</h2>
      </div>
      <book-list :books="searchResults" />
    </div>
    <div v-if="!searchQuery">
      <div class="header-text">
        <h2>Recommended Books</h2>
      </div>

      <book-list :books="books" />
    </div>
  </div>
</template>

<style scoped>
  .input-box {
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;

    input {
      padding: 0.5rem;
      font-size: 1rem;
      width: 50%;
      border: 1px solid #C9B8D8;
      border-radius: 0.25rem;
    }

    input:focus {
      outline: none;
      border-color: #C9B8D8;
    }

    button {
      padding: 0.5rem;
      font-size: 1rem;
      width: 5rem;
      background-color: #ffffff;
      border: 1px solid #C9B8D8;
      border-radius: 0.25rem;
    }
  }

  .header-text {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

</style>

<script>
import BookList from '@/components/BookList.vue'

export default {
  components: { BookList },
  data() {
    return {
      searchQuery: '',
      timeout: null,
      searchResults: [],
      books: [],
      loading: false,
      controller: null
    };
  },
  methods: {
    debouncedInputHandler() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.inputHandler();
      }, 300);
    },
    inputHandler() {
      console.log(this.loading);
      if (this.controller) {
        this.loading = true;
        this.controller.abort();
      }
      this.searchResults = [];

      if (this.searchQuery === '') {
        this.loading = false;
        return;
      }
      this.loading = true;
      this.controller = new AbortController();
      const { signal } = this.controller;
      fetch("http://localhost:8000/search/"+encodeURIComponent(this.searchQuery), { signal })
        .then(response => response.json())
        .then(data => {
          this.loading = false;
          this.searchResults = data.docs;
        })
        .catch(error => {
          console.log(error);
        })

      console.log("Debounced input value:", this.searchQuery);
    }
  },
  beforeMount() {
    fetch("http://localhost:8000/recommendations")
      .then(response => response.json())
      .then(data => {
        this.books = data;
      })
  },
  unmounted() {
    clearTimeout(this.timeout);
  }
};
</script>