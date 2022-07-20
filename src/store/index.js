import { createStore } from 'vuex'
import { auth } from './modules/Auth'



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
        auth
    }
  })

export default store