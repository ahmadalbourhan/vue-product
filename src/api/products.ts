import { Ref } from 'vue'
import { Product } from '../types/Product'

export const fetchProducts = async (products: Ref<Product[]>, isLoading: Ref<boolean>) => {
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

export const fetchCategories = async (categories: Ref<string[]>) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    categories.value = await response.json();
    console.log('Fetched categories:', categories.value);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
