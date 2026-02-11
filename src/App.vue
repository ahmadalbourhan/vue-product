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

  <div v-if="selectedProduct" class="p-6 bg-white max-w-md mx-auto">
    <h2>{{ selectedProduct.title }}</h2>
    <img :src="selectedProduct.image" alt="Product Image" width="200" />
    <p>{{ selectedProduct.description }}</p>
    <p>Price: ${{ selectedProduct.price }}</p>
    <p>Category: {{ selectedProduct.category }}</p>
    <p>Rating: {{ selectedProduct.rating.rate }} ({{ selectedProduct.rating.count }} reviews)</p>
    <button @click="clearSelection" class="">Back to Products</button>

  </div>

  <div v-else>
    <h1 class="text-3xl font-bold m-6">Products</h1>
    <input type="text" placeholder="Search products..." v-model="searchQuery" class="border p-3 m-4" />

    <select v-model="searchCategory" class="border p-3 m-4">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>

    </select>

    <div v-if="isLoading">Loading products... </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <li v-for="product in filteredProducts" :key="product.id" @click="selectProduct(product)"
        class="bg-white p-4 m-3 shadow-sm transition-shadow cursor-pointer border border-gray-100 flex flex-col items-center text-center">
        <img :src="product.image" alt="Product Image" width="50" />
        {{ product.title }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>
