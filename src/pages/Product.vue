<template>
  <div :key="componentKey" class="flex justify-center my-10">
    <div class=" p-20 w-8/12 flex min-h-fit justify-between">
      <img
        class="object-contain w-5/12"
        :src="product.productImage"
        :alt="product.productName"
      />

      <div class="max-w-5/12">
        <h1 class="font-bold text-4xl">{{ product.productName }}</h1>
        <h1 class="text-green-600 font-bold text-xl">${{ product.productSellPrice }}</h1>
        <p class="text-xl">{{ product.productDescription }}</p>
        
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "Product",
  data() {
    return {
      product: [],
      componentKey: 0,
    };
  },
  created() {
    
    const route = useRoute();
    axios
      .get("http://localhost:5000/api/products/" + route.params.productname)
      .then((res) => {
        this.product = res.data[0];
        console.log(res.data);
      });
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>

<style>
</style>