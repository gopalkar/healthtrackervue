import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        isAuthenticated: false,
        user: '',
    },
    mutations: {
        setAuthentication(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        authenticateUser({commit}, isAuthenticated) {
            commit('setAuthentication', isAuthenticated);
        },
        loginUser({ commit }, user) {
            commit('setUser', user);
        },
        logoutUser({ commit }) {
            commit('setUser', null);
        },
    },
});
export default store