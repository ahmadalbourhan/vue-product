<script setup lang="ts">
import { Product } from '../types/Product'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'back'): void
}>()
</script>

<template>
  <div class="p-6 bg-white max-w-md mx-auto">
    <h2>{{ product.title }}</h2>
    <img :src="product.image" alt="Product Image" width="200" />
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
    <button @click="$emit('back')" class="border p-2 m-3 cursor-pointer">Back to Products</button>
  </div>
</template>
