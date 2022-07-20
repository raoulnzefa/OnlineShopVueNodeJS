/* eslint-disable */
import { userService } from '../../services/user.service';

import router from '../../router/router'

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user,users:null }
    : { status: {}, user: null };
    

const getters={
  getStatus(state){
    return state.status
  },
  getUsers(state){
    return state.users
  }
}

const actions = {
    login({  commit }, payload) {
        
      const req = {
        email:payload.email,
        password:payload.password
      }
      
      commit('loginRequest', payload.email);
      
        userService.login(req)
            .then((res) => {
                    console.log('logged')
                    commit('loginSuccess', res);
                    router.push('/'); 
                }).catch(error => {
                  commit('loginFailure', error);
                  // dispatch('alert/error', error, { root: true });
              });

              
    },
     logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, client) {
        commit('registerRequest', client);
    
        userService.register(client)
            .then(
                client => {
                    commit('registerSuccess', client);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
     async getAll(){
       await userService.getAll()
       
    },
    setUsers({commit},users){
      commit('setUsers', users);
    }
    
     
   
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    },
    setUsers(state,users) {
      state.users = users;
  }
};

export const auth = {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
};