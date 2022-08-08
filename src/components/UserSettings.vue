<template>
  <div v-if="isLogged" class="hidden md:block group relative">
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
        transform
        -translate-x-1/2
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
            class="
              flex
              justify-between
              items-center
              text-left
              px-4
              py-2
              hover:bg-gray-200
            "
          >
            Settings <font-awesome-icon size="md" icon="gear" />
          </router-link>
        </li>
        <li>
          <router-link
            to="/account/orders"
            class="
              flex
              justify-between
              items-center
              text-left
              px-4
              py-2
              hover:bg-gray-200
            "
          >
            Your orders <font-awesome-icon size="md" icon="bag-shopping" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  computed: {
    isLogged() {
      return this.$store.getters["auth/getStatus"].loggedIn;
    },
  },
};
</script>

<style>
</style>