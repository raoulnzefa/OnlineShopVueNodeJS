<template>
  <div class=" mx-auto p-4 w-screen h-screen bg-gray-100">
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <h1 class="text-lg font-bold">Login</h1>
    <form @submit.prevent="login" class="flex flex-col mt-4">
      <input
          type="email"
          name="email"
          class="px-4 py-3 mt-4 w-full outline-none border-b-gray-300 border bg-gray-100 border-transparent focus:border-b-gray-500 focus:bg-white text-sm"
          placeholder="Email address"
          v-model="payload.email"
      />
      <input
          type="password"
          name="password"
          class="px-4 py-3 mt-4 w-full outline-none border-b-gray-300 border bg-gray-100 border-transparent focus:border-b-gray-500 focus:bg-white text-sm"
          placeholder="Password"
          v-model="payload.password"
      />
      
      <button
          type="submit"
          class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
      >
        Login
      </button>
      <p class="text-red-600">
        {{credentialsAlert}}
      </p>
      <div class="flex flex-col items-center mt-5">
        <p class="mt-1 text-xs font-light text-gray-500">
          Don't have an account?<router-link to="/register" class="ml-1 font-medium text-blue-400">Register!</router-link>
          </p>
      </div>
      <div class="flex flex-col items-center mt-5">
        <p class="mt-1 text-xs font-light text-gray-500">
          <router-link to="/reset-password" class="ml-1 font-medium text-blue-400">Forgot password</router-link>
          </p>
      </div>
    </form>
  </div>
</div>
</template>

<script>



export default {
  name: 'Login',
  data(){
    return{
        payload:{
            email:'',
            password:''
        },
        users:[]
    }
  },
  computed:{
    credentialsAlert(){
      return this.$store.getters["auth/getMessage"];
    }
  },
  methods:{
      
     async login(){
        await this.$store.dispatch('auth/login',this.payload).then(this.$router.push('/'))
    }
  }
}
</script>


