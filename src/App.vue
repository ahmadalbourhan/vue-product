<script setup lang="ts">
import { Product } from './Product'
import { computed, onMounted, ref } from 'vue'

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref(true);

const searchQuery = ref('');
const searchCategory = ref('');

const selectedProduct = ref<Product | null>(null);

const selectProduct = (product: Product) => {
  selectedProduct.value = product;
};

const clearSelection = () => {
  selectedProduct.value = null;
};

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

const fetchCategories = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    categories.value = await response.json();
    console.log('Fetched categories:', categories.value);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const category = searchCategory.value;

  if (!query && !category) return products.value


  return products.value.filter(product =>
    product.title.toLowerCase().includes(query) && product.category === category
  )
})

onMounted(() => {
  fetchProducts(),
    fetchCategories()
})

</script>

<template>

  <div v-if="selectedProduct" class="product-details">
    <h2>{{ selectedProduct.title }}</h2>
    <img :src="selectedProduct.image" alt="Product Image" width="200" />
    <p>{{ selectedProduct.description }}</p>
    <p>Price: ${{ selectedProduct.price }}</p>
    <p>Category: {{ selectedProduct.category }}</p>
    <p>Rating: {{ selectedProduct.rating.rate }} ({{ selectedProduct.rating.count }} reviews)</p>
    <button @click="clearSelection">Back to Products</button>

  </div>

  <div v-else>
    <h1>Products</h1>
    <input type="text" placeholder="Search products..." v-model="searchQuery" />

    <select v-model="searchCategory">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>

    </select>

    <div v-if="isLoading">Loading products... </div>
    <ul>
      <li v-for="product in filteredProducts" :key="product.id" @click="selectProduct(product)"
        style="cursor: pointer;">
        <img :src="product.image" alt="Product Image" width="50" />
        {{ product.title }} - ${{ product.price }}
        <hr />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
