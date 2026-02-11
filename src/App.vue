<script setup lang="ts">
import { Product } from './Product'
import { ref } from 'vue'

const products = ref<Product[]>([]);
const isLoading = ref(true);

const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products.value = await response.json();
    console.log('Fetched products:', products.value);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

fetchProducts();

</script>

<template>
  <h1>Products</h1>
  <div v-if="isLoading">Loading products... </div>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - ${{ product.price }}
    </li>
  </ul>
</template>

<style scoped></style>
