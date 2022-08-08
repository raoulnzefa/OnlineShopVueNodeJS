<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="border border-gray-300 rounded-md p-7 w-5/12 m-1">
      <div class="w-full">
        <h1 class="text-lg text-center font-bold">Reset your password</h1>
        <p class="text-center">Enter and confirm your new password</p>
        <div class="flex flex-col mt-4">
        
            <input
            v-model="password"
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
            placeholder="Type your new password"
          />

          <input
            v-model="cPassword"
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
            placeholder="Confirm new password"
          />

          <button
            class="mt-4 px-4 py-3 leading-6 text-base rounded-sm border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            
            @click="changePassword"
            
          >
            Change Password
          </button>
          <p class="text-red-600">{{alert}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from "vue-router";
export default {
    name:'ChangePassword',
    data(){
        return{
            password:'',
            cPassword:'',
            alert:'',
            route:null
        }
    },
    computed:{
        passwordIsMatch(){
            if(this.password === this.cPassword){
                return true
            }else{
                return false
            }
        }
    },
    mounted(){
        const route = useRoute()
        this.route = route
    },  
    methods:{
        changePassword(){
            
            if(this.passwordIsMatch){
                const body = {
                token : this.route.params.token,
                newPassword: this.password
            }
            axios.post('http://localhost:5000/api/clients/reset-password-link',body).then(res=>{
                if(res.data === 'Password changed succesfully'){
                  const user = localStorage.getItem('user')
                  if(user){
                    this.$store.dispatch("auth/logout");
                  }

                    alert('Password updated, login')
                    this.$router.push('/login')
                }else{
                    this.alert = this.data
                }
            })
            }else{
                this.alert = "Password missmatch"
            }
            
        }
    }
}
</script>

<style>

</style>