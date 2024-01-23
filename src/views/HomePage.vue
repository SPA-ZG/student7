<template>
  <div>
    <div class="input-box">
      <input
        type="search"
        v-model="searchQuery"
        @input="debouncedInputHandler"
        placeholder="Search books..."
      />
      <button>Search</button>
    </div>
    <div v-if="!!searchQuery">
      <div class="header-text" v-if="loading">
        <h2>Loading... (this could take a while)</h2>
      </div>
      <div class="header-text" v-if="searchResults.length === 0 && !loading">
        <h2>No results found</h2>
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
    border: 1px solid #c9b8d8;
    border-radius: 0.25rem;
  }

  input:focus {
    outline: none;
    border-color: #c9b8d8;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
    width: 5rem;
    background-color: #ffffff;
    border: 1px solid #c9b8d8;
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
import router from '@/router/index.js'

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
    }
  },
  methods: {
    debouncedInputHandler() {
      this.loading = true
      this.searchResults = []
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        this.inputHandler()
      }, 300)
    },
    inputHandler() {
      router.push({ path: '/', query: { q: this.searchQuery } })
      if (this.controller) {
        this.controller.abort()
      }
      if (this.searchQuery === '') {
        this.loading = false
        return
      }

      this.controller = new AbortController()
      const { signal } = this.controller
      fetch(import.meta.env.VITE_API_URL + '/search/' + encodeURIComponent(this.searchQuery), {
        signal
      })
        .then((response) => response.json())
        .then((data) => {
          this.loading = false
          this.searchResults = data.docs
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            this.loading = false
            this.searchResults = []
          }
        })
    }
  },
  beforeMount() {
    if (this.$route.query.q) {
      this.searchQuery = this.$route.query.q
      this.loading = true
      this.inputHandler()
    }
    fetch(import.meta.env.VITE_API_URL + '/recommendations')
      .then((response) => response.json())
      .then((data) => {
        this.books = data
      })
  },
  unmounted() {
    clearTimeout(this.timeout)
  }
}
</script>
