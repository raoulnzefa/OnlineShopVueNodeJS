<template>
  <div class="flex justify-center my-10">
    <div
      class="
        rounded-xl
        p-5
        bg-gray-200
        py-14
        w-8/12
        flex
        min-h-fit
        flex-col
        md:flex-row
        items-center
        md:items-start
        justify-between
      "
    >
      <img
        class="object-contain w-5/12 rounded-xl"
        :src="product.productImage"
        :alt="product.productName"
      />

      <div
        class="
          max-w-5/12
          w-10/12
          md:w-7/12 md:p-5 md:h-full
          flex
          items-center
          justify-between
          flex-col
        "
      >
        <div>
          <h1 class="md:text-right text-center px-5 font-bold text-4xl">
            {{ product.productName }}
          </h1>
          <h1 class="md:text-right text-blue-500 text-center px-5 font-bold text-2xl">
            {{ product.productStock }} in Stock
          </h1>
          <h1
            class="
              text-green-600
              md:text-right
              text-center
              p-5
              font-bold
              text-4xl
            "
          >
            $MXN {{ product.productSellPrice }}
          </h1>
          <p class="text-md m-2 text-center md:text-right">
            {{ product.productDescription }}
          </p>
        </div>

        <div class="w-full flex items-center flex-col">
          <button
            @click="buyNow"
            class="
              bg-blue-500
              m-1
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              w-full
            "
          >
            Buy now
          </button>
          <button
            @click="addProductToCart"
            v-if="!isProductInCar"
            class="
              border border-blue-500
              m-1
              hover:bg-blue-700
              w-full
              text-blue-500
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Add to cart
          </button>
          <button
            @click="removeFromCart"
            v-if="isProductInCar"
            class="
              border border-blue-500
              m-1
              hover:bg-blue-700
              w-full
              text-blue-500
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Remove from cart
          </button>
        </div>
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
      product: {},
      componentKey: 0,
      isProductInCar:false,
      stripe:{},
      
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters["auth/getStatus"].loggedIn;
    },
  },
  mounted() {
     /* eslint-disable */
    this.stripe = Stripe('pk_test_51LOsamDWWONqHYQMPcOfouLGpqdHT7c2igdD4QT6G7cAoSlv1lKJCK0n6BpvVgRSANAQQMNqZC1a52cmNJJWMzqk00aLaMvOJk')
    const route = useRoute()
    let newCart = []
    
    const cart = JSON.parse(localStorage.getItem("cart"));
      newCart = cart.filter(function (item) {
        return item.productID == route.params.productname;
      });
      if(newCart.length > 0){
        this.isProductInCar = true
      }else{
        this.isProductInCar = false
      }
      
    window.addEventListener("foo-key-localstorage-changed", () => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      newCart = cart.filter(function (item) {
        return item.productID == route.params.productname;
      });
      if(newCart.length > 0){
        this.isProductInCar = true
      }else{
        this.isProductInCar = false
      }
    });
  },
  method: {
  },
  beforeCreate() {
    const route = useRoute();
    
    axios
      .get("http://localhost:5000/api/products/" + route.params.productname)
      .then((res) => {
        this.product = res.data[0];
      });
  },
  methods: {
    buyNow() {
      if(this.isLogged){
        const user = this.$store.getters["auth/getUser"]
        const items = []
        items.push(this.product);
        axios.post('http://localhost:5000/payment',{items:items,userId:user.id}).then(res=>{
        console.log(res)
        window.location.href = res.data.url;
        console.log(res.data.id)
      })
      }else{
        this.$router.push('/login')
      }
      
    },
    addProductToCart() {
      this.isProductInCar = true;
      let newArr = [];
      let cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart + "asd");
      if (cart == null) {
        cart = localStorage.setItem("cart", JSON.stringify([]));
        const product = {
          productID: this.product.productID,
          productName:this.product.productName,
          productImage: this.product.productImage,
          productSellPrice: this.product.productSellPrice,
          productDescripton: this.product.productDescripton,
          productStock:this.product.productStock,
          category:this.product.category,
          quantity:1,
          stripePrice:this.product.stripePrice
        }
        newArr = cart.push(product);
      } else {
        newArr = cart;
        const product = {
          productID: this.product.productID,
          productName:this.product.productName,
          productImage: this.product.productImage,
          productSellPrice: this.product.productSellPrice,
          productDescripton: this.product.productDescripton,
          productStock:this.product.productStock,
          category:this.product.category,
          quantity:1,
          stripePrice:this.product.stripePrice
        }
        newArr.push(product);
        console.log(cart);
      }
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(newArr));
      window.dispatchEvent(
        new CustomEvent("foo-key-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("foo-key"),
          },
        })
      );
    },
    removeFromCart() {
      this.isProductInCar = false;
      const prodID = this.product.productID;
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter(function (item) {
        return item.productID !== prodID;
      });
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(
        new CustomEvent("foo-key-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("foo-key"),
          },
        })
      );
    },
  },
};
</script>

<style>
</style>