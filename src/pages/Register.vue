<template>
  <div class="mx-auto p-4 w-screen h-screen bg-gray-100">
    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
      <h1 class="text-lg font-bold">Register</h1>
      <form @submit.prevent="register" class="flex flex-col mt-4">
        <input
          type="text"
          name="full-name"
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
          placeholder="Full Name"
          v-model="payload.fullName"
        />
        <div class="flex items-center">
          <input
          v-on:blur="checkValidEmail"
            type="email"
            name="email"
            :class="
              isEmailValid && (isEmailValidRes || isEmailValidRes === null)
                ? ' px-4 py-3 mt-4 w-full outline-none border-b-gray-300 border bg-gray-100 border-transparent focus:border-b-gray-500 focus:bg-white text-sm'
                : ' px-4 py-3 mt-4 w-full outline-none border-b-red-300 border bg-red-100 border-red focus:border-b-red-500 focus:bg-red-100 text-sm'
            "
            placeholder="Email address"
            v-model="payload.email"
          />

          <div v-if="isEmailValidRes && isEmailValid">
          <font-awesome-icon class="absolute ml-2 w-3 h-3 text-green-600" size="xl" icon="check" />
          </div>

          <div v-if="emailCheckLoading" role="status">
            <svg
              aria-hidden="true"
              class="
                my-auto
                absolute
                w-5
                h-5
                text-gray-200
                animate-spin
                dark:text-gray-300
                fill-blue-600
              "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <p v-if="!isEmailValid || isEmailValidRes == false" class="text-xs text-red-600">
          {{ emailAlert }}
        </p>
        <input
          type="password"
          name="password"
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
          placeholder="Password"
          v-model="payload.password"
        />
        <p v-if="!passwordLength" class="text-xs text-red-600">
          {{ passwordLengthAlert }}
        </p>
        <input
          type="password"
          name="repeat-password"
          :class="
              passwordIsMatch || payload.repeatedPassword === ''
                ? ' px-4 py-3 mt-4 w-full outline-none border-b-gray-300 border bg-gray-100 border-transparent focus:border-b-gray-500 focus:bg-white text-sm'
                : ' px-4 py-3 mt-4 w-full outline-none border-b-red-300 border bg-red-100 border-red focus:border-b-red-500 focus:bg-red-100 text-sm'
            "
          placeholder="Repeat Password"
          v-model="payload.repeatedPassword"
        />
        <p v-if="!passwordIsMatch && payload.repeatedPassword !== ''" class="text-xs text-red-600">
          {{ rPasswordAlert }}
        </p>
        
        <button
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
            w-full
            justify-center
            items-center
            font-medium
            focus:outline-none
          "
        >
          Register
        </button>
        <p class="text-red-600">
          {{ alertText }}
        </p>
        <div class="flex flex-col items-center mt-5">
          <p class="mt-1 text-xs font-light text-gray-500">
            Register already?<router-link
              to="/login"
              class="ml-1 font-medium text-blue-400"
              >Sign in now</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      payload: {
        email: "",
        password: "",
        fullName: "",
        repeatedPassword: "",
      },
      alertText: "",
      emailAlert: "Invalid Email Format",
      emailCheckLoading: false,
      isEmailValidRes:null,
      rPasswordAlert:'Password missmatch',
      passwordLengthAlert:'Password must be 4 characters at least'
    };
  },
  
  computed: {
    passwordLength(){
      if(this.payload.password.length >= 4 || this.payload.password === ""){
        return true
      }else{
        return false
      }
    },
    passwordIsMatch(){
      if(this.payload.password === this.payload.repeatedPassword){
        return true
      }else{
        return false
      }
    }, 
    isEmailValid() {
      // eslint-disable-next-line
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.payload.email.match(mailformat) || this.payload.email === "") {
        return true;
      } else {
        
        return false;
      }
    },
  },
  mounted() {
    window.addEventListener("email-check", () => {
      if(!this.isEmailValid){
        this.isEmailValidRes = false
      }
      if(this.isEmailValid && this.payload.email !== ''){
        const body = {
          email: this.payload.email,
        };
        this.emailCheckLoading = true;
        this.isEmailValidRes = null
        axios
          .post("http://localhost:5000/api/clients/check-email", body)
          .then((res) => {
            if(res.data === 'Email available'){
              this.isEmailValidRes = true
            }else{
              this.isEmailValidRes = false
              this.emailAlert = 'Email not available'
            }
            this.emailCheckLoading = false;
          });
      }
    });
  },
  methods: {
    checkValidEmail(){
      window.dispatchEvent(
        new CustomEvent("email-check")
      );
    },
    async register() {
      // eslint-disable-next-line

      if (
        this.payload.password.length > 3 &&
        this.payload.password == this.payload.repeatedPassword &&
        this.payload.fullName != "" &&
        this.isEmailValid
      ) {
        await this.$store.dispatch("auth/register", this.payload);
      } else if (this.payload.password != this.payload.repeatedPassword) {
        this.alertText = "Password Missmatch";
      } else if (this.payload.fullName == "") {
        this.alertText = "Invalid Username";
      } else if (!this.isEmailValid) {
        this.alertText = "Invalid Email";
      } else if (this.payload.password.length <= 3) {
        this.alertText = "Invalid Password";
      }
    },
  },
};
</script>