<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProductDetails from '../components/ProductDetails.vue'
import ProductList from '../components/ProductList.vue'
import ProductSearchControls from '../components/ProductSearchControls.vue'
import { fetchCategories, fetchProducts } from '../api/products'
import { Product } from '../types/Product'

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref(true);

const searchQuery = ref('');
const searchCategory = ref('');

const selectedProduct = ref<Product | null>(null);

const isList = ref(true);

const selectProduct = (product: Product) => {
  selectedProduct.value = product;
};

const clearSelection = () => {
  selectedProduct.value = null;
};

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const category = searchCategory.value;

  if (!query && !category) return products.value


  return products.value.filter(product => {
    const matchesQuery = product.title.toLowerCase().includes(query)
    const matchesCategory = !category || product.category === category
    return matchesQuery && matchesCategory
  }
  )
})

onMounted(() => {
  fetchProducts(products, isLoading),
    fetchCategories(categories)
})
</script>

<template>

  <ProductDetails
    v-if="selectedProduct"
    :product="selectedProduct"
    @back="clearSelection"
  />

  <div v-else>
    <h1 class="text-3xl font-bold m-6">Products</h1>
    <ProductSearchControls
      v-model:searchQuery="searchQuery"
      v-model:searchCategory="searchCategory"
      v-model:isList="isList"
      :categories="categories"
    />

    <ProductList
      :products="filteredProducts"
      :isList="isList"
      :isLoading="isLoading"
      @select="selectProduct"
    />
  </div>
</template>
