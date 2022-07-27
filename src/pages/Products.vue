<template>
  <div class="flex justify-center">
    <h1 class="font-bold text-5xl mt-5 w-2/12 text-center">{{ page }}</h1>
    
    <div class="my-20 pr-5 max-w-10/12 min-w-10/12 w-10/12">
      <button class="p-2 rounded-sm m-4 border border-gray-300" @click="changeSorting">{{priceSorting == 'ascending' ? 'Order by descending price': 'Order by ascending price'}}</button>
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
            h-60
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
          <h1 class="text-green-700 font-bold text-xl">
            $MXN {{ product.productSellPrice }}
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
      page: "",
      priceSorting: "descending",
    };
  },
  mounted() {
    const route = useRoute();

    if (route.params.category == "shirts") {
      this.page = "Shirts";
      axios
        .get("http://localhost:5000/api/products/category/Shirt")
        .then((res) => {
          console.log(res.data + "asd");
          this.products = res.data;
        });
    } else if (route.params.category == "pants") {
      this.page = "Pants";
      axios
        .get("http://localhost:5000/api/products/category/Pant")
        .then((res) => {
          this.products = res.data;
        });
    } else {
      this.page = "All Products";
      axios.get("http://localhost:5000/api/products").then((res) => {
        this.products = res.data;
      });
    }
  },
  methods: {
    changeSorting() {
      if (this.priceSorting == "descending") {
        this.products.sort(function (a, b) {
          var keyA = new Date(a.productSellPrice),
            keyB = new Date(b.productSellPrice);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        this.priceSorting = "ascending";
      } else {
        this.products.sort(function (a, b) {
          var keyB = new Date(a.productSellPrice),
            keyA = new Date(b.productSellPrice);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        this.priceSorting = "descending";
      }
    },
  },
};
</script>
