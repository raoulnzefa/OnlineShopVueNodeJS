/* eslint-disable */
import { userService } from '../../services/user.service';

import router from '../../router/router'

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user,users:null,message:'' }
    : { status: {}, user: null,message:'' };
    

const getters={
  getStatus(state){
    return state.status
  },
  getUsers(state){
    return state.users
  },
  getUser(state){
    return state.user
  },
  getMessage(state){
    return state.message
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
            .then(async (res) => {
                    console.log(res)
                    commit('loginSuccess', res);
                    router.go(0)
                    
                    
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
                    router.push('/verify-sent');
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
    },
    setUser({commit},user){
        commit('setUser', user);
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
    setUser(state,user){
        state.user = user
    },
    loginFailure(state) {
        state.status = {};
        state.message = "Incorrect email or password"
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