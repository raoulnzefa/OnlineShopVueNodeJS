<template>
    <div>
        
        <button @click="getUser">get users</button>
        <div v-for="user in users" :key="user.userID">
            <ul>
                <li >{{user.userName}}</li>
            </ul>
        </div>
        
       
    </div>
</template>

<script>




export default {
    data() {
        return {
            token: '',
        }
    },
    computed: {
        username() {
            // We will see what `params` is shortly
            return this.$route.params.username
        },
        users(){
            return this.$store.getters['auth/getUsers']
        }
    },
    methods: {
        toggleNav: function () {
        this.showMenu = !this.showMenu;
      },
         getUser() {
            if(this.users == null){
                this.$store.dispatch('auth/getAll')
                }
        },
    
    },
}
</script>


