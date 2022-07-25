<template>
  <Navbar/>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>

import Navbar from './components/Navbar'
export default {
  name: 'App',
  
  components: {
    Navbar
  },
  methods:{
      async getUser() {
            if(this.users == null){
                await this.$store.dispatch('auth/getAll')
                }
        }
     },
     beforeCreate(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    
        
      if(cart == null) {
        cart = localStorage.setItem("cart", JSON.stringify([]));
      }
      
     },
  mounted() {
    


    window.setInterval(()=>{
        const user = localStorage.getItem('user');
        if(user != null){
          this.getUser().then(res=>{console.log(res)})
        }
    },86400000)
  },
  
}
</script>


