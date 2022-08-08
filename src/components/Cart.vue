/* eslint-disable */
<template>
  <div class="hidden z-1000 md:block group relative">
    <button
      class="
        text-sm
        w-full
        rounded
        p-4
        h-10
        flex
        items-center
        md:w-auto
        font-bold
        hover:bg-gray-300
        text-gray-800
        hover:text-blue-400
      "
    >
      <font-awesome-icon size="xl" icon="cart-shopping" />
    </button>

    <div
      tabindex="0"
      class="
        z-1000
        border-opacity-25 border
        rounded-md
        bg-gray-100
        invisible
        border-gray-800
        w-96
        absolute
        -right-4
        top-full
        transition-all
        opacity-0
        group-hover:visible group-hover:opacity-100
        max-h-96
        h-96
        overflow-y-scroll
        flex flex-col
      "
    >
      <ul v-if="cart.length > 0" class="py-1">
        <li
          v-for="(product, index) in cart"
          :index="index"
          class="flex h-32 p-4 hover:bg-gray-200"
          :key="product.productID"
        >
          <img
            @click="showProducts"
            class="w-2/6 object-contain rounded"
            :src="product.productImage"
            :alt="product.productName"
          />
          <div class="flex flex-col w-full p-3">
            <div class="flex justify-between w-full">
              <h1 class="w-full">{{ product.productName }}</h1>
              <button @click="removeFromCart(product.productID)">
                <font-awesome-icon size="xl" icon="xmark" />
              </button>
            </div>
            <h1 class="font-bold">${{ product.productSellPrice }}</h1>
            <div
              class="
                h-16
                w-2/5
                rounded-2xl
                flex
                justify-between
                items-center
                bg-white
              "
            >
              <button
                @click="minusOneProduct(index)"
                class="w-1/3 h-full bg-gray-300 rounded-l-2xl"
              >
                -
              </button>
              <div class="text-sm">
                {{ product.quantity }}
              </div>

              <button
                @click="sumOneProduct(index)"
                class="w-1/3 h-full bg-gray-300 rounded-r-2xl"
              >
                +
              </button>
            </div>
          </div>
        </li>
        <div class="w-10/12 bg-gray-400 h-px mx-auto"></div>
        <h1 class="font-bold text-xl relative bottom-0 text-right m-5">
          Subtotal:${{ subtotalPrice }}
        </h1>
      </ul>

      <h1 class="font-bold text-2xl text-center m-10" v-else>
        Your cart is empty
      </h1>
      <button
        v-if="subtotalPrice > 0"
        @click="redirectToPayment"
        class="
          border border-blue-500
          hover:bg-blue-700
          w-11/12
          text-blue-500
          font-bold
          py-2
          px-4
          rounded
          self-center
        "
      >
        Go to checkout
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
      items: [],
      stripe:{},
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.$store.dispatch('products/setOrder',this.cart)
    if (this.cart.length > 0) {
      this.stripe = Stripe('pk_test_51LOsamDWWONqHYQMPcOfouLGpqdHT7c2igdD4QT6G7cAoSlv1lKJCK0n6BpvVgRSANAQQMNqZC1a52cmNJJWMzqk00aLaMvOJk')
    
    }
    
    window.addEventListener("foo-key-localstorage-changed", () => {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.$store.dispatch('products/setOrder',this.cart)
      if (this.cart.length > 0) {
      this.stripe = Stripe('pk_test_51LOsamDWWONqHYQMPcOfouLGpqdHT7c2igdD4QT6G7cAoSlv1lKJCK0n6BpvVgRSANAQQMNqZC1a52cmNJJWMzqk00aLaMvOJk')
    
      
    }
    });
  },
  computed: {
    isLogged() {
      return this.$store.getters["auth/getStatus"].loggedIn;
    },
    subtotalPrice() {
      var subtotal = 0;
      this.cart.forEach((element) => {
        const elementTotal = element.quantity * element.productSellPrice;
        subtotal += elementTotal;
      });
      return subtotal.toFixed(2);
    },
  },
  methods:{
    redirectToPayment(){
      if(this.isLogged){
        const items = this.$store.getters["products/getOrder"];
      
      const user = this.$store.getters["auth/getUser"];
      axios.post('http://localhost:5000/payment',{items:items,userId:user.id}).then(res=>{
        console.log(res)
        window.location.href = res.data.url;
        console.log(res.data.id)
      })

      localStorage.removeItem('cart')
      this.cart = []
      this.$store.dispatch('products/setOrder',this.cart)
      }else{
        this.$router.push('/login')
      }
    },
    sumOneProduct(index) {
      const cart = localStorage.getItem("cart");
      const JSONCart = JSON.parse(cart);

      var newCart = JSONCart.map(function (element) {
        if (
          index == JSONCart.indexOf(element) &&
          element.quantity < element.productStock
        ) {
          element.quantity += 1;
          return element;
        }
        return element;
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
    minusOneProduct(index) {
      const cart = localStorage.getItem("cart");
      const JSONCart = JSON.parse(cart);

      var newCart = JSONCart.map(function (element) {
        if (index == JSONCart.indexOf(element) && element.quantity > 1) {
          element.quantity -= 1;
          return element;
        }
        return element;
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
    showProducts() {
      console.log(this.cart);
    },
    removeFromCart(prodID) {
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
  }
}
</script>
