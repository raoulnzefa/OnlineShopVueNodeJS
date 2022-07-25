const state = {
    order: []
};

const getters = {
    getOrder: state => state.order
};

const actions = {
    setOrder({ commit }, order) {
        commit('setOrderMutation', order);
    }
   
};

const mutations = {
    setOrderMutation(state, order) {
        state.order = order;
    },
};


export const products = {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
};