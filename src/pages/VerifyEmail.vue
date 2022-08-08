<template>
  <div class="flex justify-center my-10">
    <div
      class="
        rounded-xl
        p-10
        bg-gray-200
        flex-col
        w-8/12
        flex
        min-h-fit
        items-center
      "
    >
      <h1 class="font-bold text-2xl">Email verified! log into your account</h1>
      
      <router-link
        to="/login"
        type="submit"
        class="
          mt-4
          px-4
          py-3
          leading-6
          text-base
          rounded-md
          border border-transparent
          text-white
          focus:outline-none
          bg-blue-500
          text-blue-100
          hover:text-white
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          cursor-pointer
          inline-flex
          items-center
          w-1/4
          justify-center
          items-center
          font-medium
          focus:outline-none
        "
      >
        Go to login!
      </router-link>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import axios from 'axios'
export default {
    name:'VerifyEmail',
    data(){
        return{
            token:''
        }
    },
    mounted(){
        const route = useRoute();
        this.token = route.params.token
        console.log(this.token)
        const token = {
            token:this.token
        }
        axios.post('http://localhost:5000/api/clients/auth/register',token)
        .then(res=>{console.log(res)})
    }
}
</script>

<style>

</style>