<script setup lang="ts">
import { Product } from './Product'
import { computed, onMounted, ref } from 'vue'

const products = ref<Product[]>([]);
const isLoading = ref(true);

const searchQuery = ref('');

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

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value

  const query = searchQuery.value.toLowerCase()

  return products.value.filter(product =>
    product.title.toLowerCase().includes(query)
  )
})

onMounted(() => {
  fetchProducts()
})

</script>

<template>
  <h1>Products</h1>
  <input type="text" placeholder="Search products..." v-model="searchQuery" />

  <div v-if="isLoading">Loading products... </div>
  <ul>
    <li v-for="product in filteredProducts" :key="product.id">
      <img :src="product.image" alt="Product Image" width="50" />
      {{ product.title }} - ${{ product.price }}
      <hr />
    </li>
  </ul>
</template>

<style scoped></style>
