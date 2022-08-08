<template>

  <div>
<p class="bg-gray-100 px-20 text-xs text-gray-600"><router-link class="hover:text-blue-400" to="/">Homepage</router-link> > Account settings</p>

    <div class="flex p-10 justify-evenly w-screen h-screen bg-gray-100">
    
    <div class=" w-2/12 h-min rounded-md border border-gray-300">
      <ul class="flex flex-col items-center">
        <router-link to="/account/settings" class=" flex items-center justify-between font-bold text-blue-500 p-2 w-full border border-gray-300 h-14">
          Account Settings
        </router-link>


        <router-link to="/account/orders" class=" flex items-center justify-between font-bold text-gray-500 p-2 w-full border border-gray-300 h-14">
          My Orders
        </router-link>

      </ul>
    </div>


    <div class="border border-gray-300 rounded-md p-7 w-9/12 h-auto min-h-3/4">
      <div class="w-full mb-20">
        <h1 class="text-lg font-bold">User information</h1>
        <form @submit.prevent="login" class="flex flex-col mt-4">
          <input
            type="text"
            name="username"
            class="
              px-4
              py-3
              mt-4
              w-full
              outline-none
              border-b-gray-300 border
              bg-gray-100
              border-transparent
              focus:border-b-gray-500 focus:bg-white
              text-sm
            "
            v-model="username"
            placeholder="Username"
          />

          <input
          disabled
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
            :class="
            isSameUserName ? 'mt-4 px-4 py-3 leading-6 text-base rounded-sm border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none' : 'mt-4 px-4 py-3 leading-6 text-base rounded-sm border border-transparent text-white  bg-gray-500 text-gray-200  inline-flex items-center w-full justify-center items-center font-medium'"
            :disabled="!isSameUserName"
            @click="updateUsername"
            
          >
            Update information
          </button>
          <p class="text-red-600"></p>
        </form>
      </div>
      <h1 class="font-bold">Password:</h1>
      <p>******************</p>
      
      <router-link to="/reset-password" class="
          mt-4
          px-4
          py-3
          leading-6
          text-base
          rounded-sm
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
          w-full
          justify-center
          items-center
          font-medium
          focus:outline-none
        ">Update password</router-link>
    </div>

    
      
    
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "AccountSettings",
  data() {
    return {
      email: "",
      username: "",
      startUser:""
    };
  },
  computed:{
    isSameUserName(){
        if(this.username === this.startUser){
            return false
        }else{
            return true
        }
    }
  },
  mounted() {
    const user = this.$store.getters["auth/getUser"];
    this.username = user.name;
    this.startUser = user.name;
    this.email = user.email;
  },
  methods: {
    updateUsername(){
        const user = this.$store.getters["auth/getUser"];
        const newName = {
            name:this.username
        }
        axios.put('http://localhost:5000/api/clients/' + user.id,newName)
        .then(()=>{
            user.name = newName.name;
            this.startUser = this.username;
            const localUser = JSON.parse(localStorage.getItem('user'));
            localUser.name = newName.name;
            localStorage.removeItem('user')
            localStorage.setItem('user',JSON.stringify(localUser))

            window.dispatchEvent(
        new CustomEvent("foo-key-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("foo-key"),
          },
        })
      );

            this.$store.dispatch('auth/setUser',user)
        }).catch(err=>console.log(err))
    }
  },
};
</script>

<style>
</style>