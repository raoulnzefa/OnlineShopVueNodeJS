<template>
    <div class="container mx-auto p-4 w-screen h-screen bg-gray-100">
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <h1 class="text-lg font-bold">Register</h1>
    <form @submit.prevent="register" class="flex flex-col mt-4">
      <input
          type="text"
          name="full-name"
          class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Full Name"
          v-model="payload.fullName"
      />
      <input
          type="email"
          name="email"
          class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Email address"
          v-model="payload.email"
      />
      <input
          type="password"
          name="password"
          class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Password"
          v-model="payload.password"
      />
      <input
          type="password"
          name="repeat-password"
          class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Repeat Password"
          v-model="payload.repeatedPassword"
      />
      <button
          type="submit"
          class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
      >
        Register
      </button>
      <p class="text-red-600">
        {{alertText}}
      </p>
      <div class="flex flex-col items-center mt-5">
        <p class="mt-1 text-xs font-light text-gray-500">
          Register already?<a class="ml-1 font-medium text-blue-400">Sign in now</a>
          </p>
      </div>
    </form>
  </div>
</div>
</template>

<script>
  export default {
  name: 'Register',
  data(){
    return{
        payload:{
            email:'',
            password:'',
            fullName:'',
            repeatedPassword:'',
        },
        alertText:''
    }
  },
  computed:{
    
  },
  methods:{
      
     async register(){
      // eslint-disable-next-line
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let isEmailValid = false;
      if(this.payload.email.match(mailformat)){
        isEmailValid = true
      }else{
        isEmailValid = false
      }
        if(this.payload.password.length > 3 && this.payload.password == this.payload.repeatedPassword && this.payload.fullName != '' && isEmailValid){
          await this.$store.dispatch('auth/register',this.payload)
        }else if(this.payload.password != this.payload.repeatedPassword){
          this.alertText = 'Password Missmatch'
        }else if(this.payload.fullName == ''){
          this.alertText = 'Invalid Username'
        }else if(!isEmailValid){
          this.alertText = 'Invalid Email'
        }else if(this.payload.password.length <= 3){
          this.alertText = 'Invalid Password'
        }
    }
  }
}
</script>