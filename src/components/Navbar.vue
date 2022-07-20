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
                border-t-0
                border-gray-800
                w-60
                absolute
                -left-3
                top-full
                transition-all
                opacity-0
                group-hover:visible
                group-hover:opacity-100
              "
            >
              <ul class="py-1">
                <li>
                  <router-link to="/products"  class="block px-4 py-2 hover:bg-gray-200">
                    All Products
                  </router-link>
                </li>
                <li>
                  <router-link to="/products/shirts" class="block px-4 py-2 hover:bg-gray-200">
                    Shirts
                  </router-link>
                </li>
                <li>
                  <router-link to="/products/pants" class="block px-4 py-2 hover:bg-gray-200">
                    Pants
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <router-link to="/" class="md:hidden">LOGO TIENDA</router-link>
          <div @click="showMenu = !showMenu" class="flex md:hidden">
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
            "
            to="/login"
            >product1</router-link
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
            "
            to="/login"
            >product2</router-link
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
            Cart
          </button>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import store from "../store";
export default {
  name: "Navbar",
  data() {
    return {
      showMenu: false,
      isProductsDisplayed: false,
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters["auth/getStatus"].loggedIn;
    },
  },
  methods: {
    toggleNav: function () {
      this.showMenu = !this.showMenu;
    },
    logout() {
      store.dispatch("auth/logout");
    },
  },
};
</script>