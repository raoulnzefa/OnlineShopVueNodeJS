<template>
  <div>
    authenticated page
  </div>
</template>

<script>




export default {
    created(){
      
      console.log(this.$cookies.get('asd'))
    }
}
  
</script>


