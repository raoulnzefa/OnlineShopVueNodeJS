<template>
  <div class="flex flex-col items-center">
    <div class="w-screen h-screen object-contain">
      <img class="h-4/5 w-full" src="../assets/homeImage.jpg" alt="homePage" />
    </div>

    <h1 class="text-4xl font-bold text-center">Take a look of our products</h1>
    <div class=" mb-20 w-10/12 h-screen md:flex-row flex-col flex items-center md:justify-between">

      <router-link to="/products/dresses" class="hover:bg-gray-100 transition-all duration-200 border md:mb-0 mb-10 border-gray-300 rounded-lg p-2 w-10/12 md:w-1/4 h-96">
        <img class="rounded-lg w-full h-80" src="../assets/dress.jpg" alt="dress" />
        <h1 class=" text-slate-600 text-2xl font-bold text-center mt-3">Dresses</h1>
      </router-link>

      <router-link to="/products/shirts" class="hover:bg-gray-100 transition-all duration-200 border md:my-0 my-10 border-gray-300 rounded-lg p-2 w-10/12 md:w-1/4 h-96">
        <img class="rounded-lg w-full h-80" src="../assets/shirt.jpg" alt="shirt" />
        <h1 class="text-slate-600 text-2xl font-bold text-center mt-3">Shirts</h1>
      </router-link>

      <router-link to="/products/pants" class="hover:bg-gray-100 transition-all duration-200 border md:my-0 my-10 border-gray-300 rounded-lg p-2 w-10/12 md:w-1/4 h-96">
        <img class="rounded-lg w-full h-80" src="../assets/sweater.jpg" alt="sweater" />
        <h1 class="text-slate-600 text-2xl font-bold text-center mt-3">Sweaters</h1>
      </router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      loading: true,
    };
  },
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },
    users() {
      return this.$store.getters["auth/getUsers"];
    },
  },
  methods: {
    toggleNav: function () {
      this.showMenu = !this.showMenu;
    },
    getUser() {
      if (this.users == null) {
        this.$store.dispatch("auth/getAll");
      }
    },
  },
};
</script>


