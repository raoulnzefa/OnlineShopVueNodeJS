<template>
  <div>
    <p class="px-20 text-xs text-gray-600">
      <router-link class="hover:text-blue-400" to="/">Homepage</router-link> >
      My Orders
    </p>

    <div
      class="flex p-10 justify-evenly w-screen min-h-screen h-auto bg-gray-00"
    >
      <div class="w-2/12 h-min rounded-md border border-gray-300">
        <ul class="flex flex-col items-center">
          <router-link
            to="/account/settings"
            class="
              flex
              items-center
              justify-between
              font-bold
              text-gray-500
              p-2
              w-full
              border border-gray-300
              h-14
            "
          >
            Account Settings
          </router-link>

          <router-link
            to="/account/orders"
            class="
              flex
              items-center
              justify-between
              font-bold
              text-blue-500
              p-2
              w-full
              border border-gray-300
              h-14
            "
          >
            My Orders
          </router-link>
        </ul>
      </div>
      <div
        v-if="orders.length < 1"
        class="border border-gray-300 rounded-md p-7 w-9/12 h-max min-h-3/4"
      >
        <h1>
          No orders here,
          <router-link to="/products" class="text-blue-400"
            >Start shopping!!</router-link
          >
        </h1>
      </div>
      <div
        v-else
        class="
          border border-gray-300
          rounded-md
          overflow-hidden
          p-7
          w-9/12
          h-max
          min-h-3/4
        "
      >
        <div
          v-for="order in orders"
          :key="order.checkoutID"
          class="h-auto mb-5"
        >
          <div class="">

            <div
            class="
              flex
              justify-between
              p-3
              w-full
              min-h-auto
              h-36
              rounded
              border border-gray-300
            "
          >
            <img
              :src="order[0].products[0].details.productImage"
              class="w-24 h-24"
              alt=""
            />
            <div class="flex flex-col justify-between pb-2">
              <h1 class="font-bold text-xl w-36">
                {{
                  order[0].products.length > 1
                    ? order[0].products[0].details.productName +
                      " And " +
                      (order[0].products.length - 1) +
                      " more"
                    : order[0].products[0].details.productName
                }}
              </h1>
              <button
                @click="order[0].isProductShow = !order[0].isProductShow"
                class="
                  text-sm
                  flex
                  items-center
                  justify-center
                  w-10/12
                  h-8
                  rounded-md
                  border border-transparent
                  focus:outline-none
                  bg-blue-500
                  text-blue-100
                  hover:text-white
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  cursor-pointer
                  p-2
                  font-medium
                "
              >
                {{ order[0].isProductShow ? "Hide concepts" : "Show concepts" }}
              </button>
            </div>

            <div>
              <h1 class="font-bold text-sm text-green-600">
                {{ "$" + order[0].total / 100 }}
              </h1>
              
              <h1 class="font-medium text-sm">
                {{ "Created at: " + formatDate(order[0].createdAt) }}
              </h1>
            </div>
            <div class="w-40">
              <h1>
                {{
                  order[0].address
                    ? order[0].address.name
                    : "Pending order details"
                }}
              </h1>
              <h1>{{ order[0].address ? order[0].address.address : "" }}</h1>
              <h1>
                {{
                  order[0].address
                    ? order[0].address.city +
                      ", " +
                      order[0].address.state +
                      ", " +
                      order[0].address.country
                    : ""
                }}
              </h1>
              <h1>
                {{ order[0].address ? order[0].address.postal_code : "" }}
              </h1>
            </div>
            <div class="w-28">
              <h1 class="mb-2">Status: {{ order[0].status }}</h1>
              <a
                :href="
                  order[0].status !== 'unpaid'
                    ? order[0].checkoutURL
                    : order[0].voucherURL
                "
                target="_blank"
                :class="
                  order[0].status !== 'paid'
                    ? 'text-xs w-10/12 h-8 rounded-md border border-transparent focus:outline-none  bg-blue-500  text-blue-100  hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer p-2 font-medium'
                    : 'text-xs flex h-8 w-10/12 justify-center items-center rounded-md border border-transparent focus:outline-none  bg-green-500  text-blue-100  hover:text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer p-2 font-medium'
                "
              >
                {{
                  order[0].status === "paid"
                    ? "See details"
                    : order[0].status === "unpaid"
                    ? "Get voucher"
                    : "Go to checkout"
                }}
              </a>
            </div>
          </div>
          <div
            v-if="order[0].isProductShow"
            class="
              rounded-b
              border border-gray-300 border-t-0
              w-11/12
              min-h-auto
              mx-auto
              p-5
            "
          >
            <div
              class="
                w-full
                h-5
                flex
                justify-between
                my-1
                px-5
                text-center
                font-medium
              "
            >
              <h1>Product image</h1>
              <h1>Product name</h1>
              <h1>Quantity</h1>
              <h1>Unit price</h1>
            </div>
            <div v-for="product in order[0].products" :key="product.productID">
              <div class="flex items-center justify-between px-10">
                <img
                  :src="product.details.productImage"
                  class="w-16 h-16"
                  alt=""
                />
                <h1>
                  {{ product.details.productName }}
                </h1>
                <h1>
                  {{ product.quantity }}
                </h1>
                <h1>${{ product.details.productSellPrice }}</h1>
              </div>
              <div
                v-if="order[0].products.length > 1"
                class="w-full bg-gray-300 h-px m-1"
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddressBook",
  data() {
    return {
      email: "",
      username: "",
      startUser: "",
      orders: [],
      isShowProducts: false,
    };
  },
  computed: {
    isSameUserName() {
      if (this.username === this.startUser) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    const user = this.$store.getters["auth/getUser"];
    this.username = user.name;
    this.startUser = user.name;
    this.email = user.email;
    axios.get("http://localhost:5000/api/orders/" + user.id).then((res) => {
      this.orders = res.data;
      console.log(this.orders);
    });
  },
  methods: {
    formatDate(fecha) {
      const date = new Date(fecha);
      function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
      }
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    },
    updateUsername() {
      const user = this.$store.getters["auth/getUser"];
      const newName = {
        name: this.username,
      };
      axios
        .put("http://localhost:5000/api/clients/" + user.id, newName)
        .then(() => {
          user.name = newName.name;
          this.startUser = this.username;
          const localUser = JSON.parse(localStorage.getItem("user"));
          localUser.name = newName.name;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(localUser));

          window.dispatchEvent(
            new CustomEvent("foo-key-localstorage-changed", {
              detail: {
                storage: localStorage.getItem("foo-key"),
              },
            })
          );

          this.$store.dispatch("auth/setUser", user);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>