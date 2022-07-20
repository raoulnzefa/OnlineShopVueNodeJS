<template>
  <div class="flex justify-center">
    <h1 class="font-bold text-5xl mt-5 text-center">{{page}}</h1>
    <div class="my-20 w-10/12">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link
          class="
            hover:shadow-2xl
            transition-all
            flex
            items-center
            justify-between
            flex-col
            p-6
            border-2 border-gray-400
            h-96
            rounded
            m-3
            cursor-pointer
          "
          :to="'/product/' + product.productID"
          v-for="product in products"
          :key="product.id"
        >
          <img
            class="object-contain w-5/6 h-1/3"
            :src="product.productImage"
            :alt="product.productName"
          />
          <h1 class="font-bold text-xl">{{ product.productName }}</h1>
          <h2 class="text-blue-500 font-bold text-md">
            {{ product.productStock }} in Stock
          </h2>
          <p class="text-center">{{ product.productDescription }}</p>
          <h1 class="text-green-700 font-bold text-xl">
            ${{ product.productSellPrice }}
          </h1>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "Products",
  data() {
    return {
      products: [],
      page:''
    };
  },
  mounted() {
    const route = useRoute();
    
    if (route.params.category == "shirts") {
        this.page = 'Shirts'
      axios.get("http://localhost:5000/api/products/category/Shirt").then((res) => {
        console.log(res.data + 'asd')
        this.products = res.data;
      });
    } else if (route.params.category == "pants") {
        this.page = 'Pants'
      axios.get("http://localhost:5000/api/products/category/Pant").then((res) => {
        this.products = res.data;
      });
    } else {
        this.page = 'All Products'
      axios.get("http://localhost:5000/api/products").then((res) => {
        this.products = res.data;
      });
    }
  },
  methods: {
    show() {
      console.log(this.products);
    },
  },
};
</script>
