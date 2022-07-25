import { createStore } from 'vuex'
import { auth } from './modules/Auth'
import {products} from './modules/Products'



const store = createStore({
    state () {
      return {
        count: 2
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    modules:{
        auth,
        products
    }
  })

export default store