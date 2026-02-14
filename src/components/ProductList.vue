<script setup lang="ts">
import { Product } from '../types/Product'

defineProps<{
  products: Product[]
  isList: boolean
  isLoading: boolean
}>()

defineEmits<{
  (e: 'select', product: Product): void
}>()
</script>

<template>
  <div v-if="isLoading">Loading products... </div>

  <ul v-if="isList" class="max-w-md mx-auto">
    <li v-for="product in products" :key="product.id" @click="$emit('select', product)"
      class="bg-white p-4 m-3 shadow-sm transition-shadow cursor-pointer border border-gray-100 flex flex-col items-center text-center">
      <img :src="product.image" alt="Product Image" width="50" />
      {{ product.title }} - ${{ product.price }}
    </li>
  </ul>
  <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <li v-for="product in products" :key="product.id" @click="$emit('select', product)"
      class="bg-white p-4 m-3 shadow-sm transition-shadow cursor-pointer border border-gray-100 flex flex-col items-center text-center">
      <img :src="product.image" alt="Product Image" width="50" />
      {{ product.title }} - ${{ product.price }}
    </li>
  </ul>
</template>
