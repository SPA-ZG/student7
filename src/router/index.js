import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'
import BookDetails from '@/views/BookDetails.vue'
import NotFound from '@/views/NotFound.vue'
import CartView from '@/views/CartView.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/book/:id', component: BookDetails, name: "book" },
  { path: '/wish', component: CartView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;