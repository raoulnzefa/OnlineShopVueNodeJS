<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="border border-gray-300 rounded-md p-7 w-5/12 m-1">
      <div class="w-full">
        <h1 class="text-lg text-center font-bold">Reset your password</h1>
        <p class="text-center">We will send you an email to reset your password</p>
        <div class="flex flex-col mt-4">
          

          <input
            v-model="email"
            type="email"
            name="email"
            class="
              px-4
              py-3
              mt-4
              w-full
              outline-none
              border-b-gray-300 border
              bg-gray-200
              border-transparent
              focus:border-b-gray-500 focus:bg-white
              text-sm
              text-gray-500
            "
            placeholder="Email address"
          />

          <button
            type="submit"
            class="mt-4 px-4 py-3 leading-6 text-base rounded-sm border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            
            @click="sendResetPassEmail"
            
          >
            Send Email
          </button>
          <p class="text-red-600"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'ResetPassword',
    data(){
        return{
            email:''
        }
    },
    methods:{
        sendResetPassEmail(){
            const email={
                email:this.email
            }
            axios.post('http://localhost:5000/api/clients/reset-password',email).then(res=>{
                console.log(res.data)
            })
        }
    }
}
</script>

<style>

</style>