<template>
  <div>
    <div class="bg-gray-100">
      <nav
        class="
          container
          py-8
          mx-auto
          md:h-16 md:flex md:justify-around md:items-center
          justify-between
        "
      >
        <div class="flex md:w-1/3 items-center justify-between">
          <div class="hidden md:block group relative">
            <button class="text-gray-800 h-16 text-sm font-bold rounded">
              Products
              <font-awesome-icon icon="angle-down" />
            </button>

            <nav
              tabindex="0"
              class="
                border-opacity-25 border
                bg-gray-100
                invisible
                border-t-0 border-gray-800
                w-60
                absolute
                -left-3
                top-full
                transition-all
                opacity-0
                group-hover:visible group-hover:opacity-100
              "
            >
              <ul class="py-1">
                <li>
                  <router-link
                    to="/products"
                    class="block px-4 py-2 hover:bg-gray-200"
                  >
                    All Products
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/products/shirts"
                    class="block px-4 py-2 hover:bg-gray-200"
                  >
                    Shirts
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/products/pants"
                    class="block px-4 py-2 hover:bg-gray-200"
                  >
                    Pants
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <router-link to="/" class="pl-5 md:hidden">LOGO TIENDA</router-link>
          <div @click="showMenu = !showMenu" class="pr-5 flex md:hidden">
            <button
              type="button"
              class="
                text-gray-800
                hover:text-gray-400
                focus:outline-none focus:text-gray-400
              "
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <router-link
          to="/"
          class="md:w-1/3 md:block hidden justify-center text-center"
          >LOGO TIENDA</router-link
        >
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="
            md:w-1/3
            justify-end
            flex-col
            mt-8
            md:flex md:space-y-0 md:flex-row md:items-center md:mt-0
          "
        >
          <li
            @click="isProductsDisplayed = !isProductsDisplayed"
            class="
              md:hidden md:w-auto
              justify-between
              text-sm
              w-full
              p-4
              h-10
              flex
              items-center
              font-bold
              hover:bg-gray-300
              text-gray-800
              hover:text-blue-400
            "
          >
            <p>Products</p>
            <font-awesome-icon v-if="!isProductsDisplayed" icon="angle-down" />
            <font-awesome-icon v-if="isProductsDisplayed" icon="angle-up" />
          </li>

          <router-link
            v-if="isProductsDisplayed"
            class="
              rounded
              text-sm
              md:w-auto
              w-full
              pl-10
              p-4
              h-10
              flex
              items-center
              font-bold
              hover:bg-gray-300
              text-gray-800
              hover:text-blue-400
              md:hidden
            "
            to="/products/shirts"
            >Shirts</router-link
          >

          <router-link
            v-if="isProductsDisplayed"
            class="
              rounded
              text-sm
              w-full
              md:w-auto
              pl-10
              p-4
              h-10
              flex
              items-center
              font-bold
              hover:bg-gray-300
              text-gray-800
              hover:text-blue-400
              md:hidden
            "
            to="/products/pants"
            >Pants</router-link
          >

          <router-link
            v-if="!isLogged"
            class="
              text-sm
              rounded
              w-full
              p-4
              h-10
              md:w-auto
              flex
              items-center
              font-bold
              hover:bg-gray-300
              text-gray-800
              hover:text-blue-400
            "
            to="/login"
            >Login</router-link
          >

          <router-link
            v-if="!isLogged"
            class="
              text-sm
              w-full
              rounded
              p-4
              h-10
              flex
              md:w-auto
              items-center
              font-bold
              hover:bg-gray-300
              text-gray-800
              hover:text-blue-400
            "
            to="/register"
            >Register</router-link
          >

          

            


          <div class="hidden md:block group relative">
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
              <font-awesome-icon size="xl" icon="circle-user" />
            </button>

            <nav
              tabindex="0"
              class="
                border-opacity-25 border
                bg-gray-100
                invisible
                border-t border-gray-800
                rounded-md
                w-40
                absolute
                right-auto
                left-1/2
                transform -translate-x-1/2 
                top-full
                transition-all
                opacity-0
                group-hover:visible group-hover:opacity-100
              "
            >
              <ul class="py-1">
                <li>
                  <router-link
                    to="/account/settings"
                    class="flex justify-between items-center text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Settings  <font-awesome-icon size="md" icon="gear" />
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/account/orders"
                    class="flex justify-between items-center text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Your orders  <font-awesome-icon size="md" icon="bag-shopping" />
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>



          <div class="hidden md:block group relative">
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
                flex
                flex-col
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
                  v-if="subtotalPrice>0"
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
          <button
            v-if="isLogged"
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
            @click="logout"
          >
            Logout
          </button>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import store from "../store";
import axios from 'axios'
export default {
  name: "Navbar",
  data() {
    return {
      showMenu: false,
      isProductsDisplayed: false,
      cart: [],
      stripe:{},
      items:[]
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.$store.dispatch('products/setOrder',this.cart)
    if (this.cart.length > 0) {
      this.stripe = Stripe('pk_test_51LOsamDWWONqHYQMPcOfouLGpqdHT7c2igdD4QT6G7cAoSlv1lKJCK0n6BpvVgRSANAQQMNqZC1a52cmNJJWMzqk00aLaMvOJk')
    
    }
    
    window.addEventListener("foo-key-localstorage-changed", (event) => {
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
  methods: {
     redirectToPayment(){
      if(this.isLogged){
        const items = this.$store.getters["products/getOrder"];
      

      axios.post('http://localhost:5000/payment',items).then(res=>{
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
    toggleNav: function () {
      this.showMenu = !this.showMenu;
    },
    logout() {
      store.dispatch("auth/logout");
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
  },
};
</script>