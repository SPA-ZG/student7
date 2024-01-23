
<template>
  <div class="app-bar">
    <router-link to="/">Home</router-link>
    <router-link to="/cart">Cart ({{ cartCount }})</router-link>
  </div>
  <RouterView />
</template>

<style>
  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #681993;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    a {
      text-decoration: none;
      color: #fff;
    }
  }
</style>

<script>

import { useCartStore } from '@/stores/index.js'

export default {
  computed: {
    cartCount() {
      const cartStore = useCartStore();
      return cartStore.getCart().length;
    }
  }
};

</script>