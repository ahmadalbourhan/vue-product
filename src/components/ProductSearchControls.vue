<script setup lang="ts">
defineProps<{
  searchQuery: string
  searchCategory: string
  isList: boolean
  categories: string[]
}>()

defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:searchCategory', value: string): void
  (e: 'update:isList', value: boolean): void
}>()
</script>

<template>
  <input
    type="text"
    placeholder="Search products..."
    :value="searchQuery"
    @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
    class="border p-3 m-4"
  />

  <select
    :value="searchCategory"
    @change="$emit('update:searchCategory', ($event.target as HTMLSelectElement).value)"
    class="border p-3 m-4"
  >
    <option value="">All Categories</option>
    <option v-for="category in categories" :key="category" :value="category">
      {{ category }}
    </option>
  </select>
  <button @click="$emit('update:isList', !isList)" class="border p-3 m-4">
    {{ isList ? 'List View' : 'Grid View' }}
  </button>
</template>
