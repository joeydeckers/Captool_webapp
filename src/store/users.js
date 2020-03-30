import axios from 'axios'
import router from './../../router'

const state = {
    access_token: ''
};

const getters = {
    getAccesToken: (state) => {
        return state.access_token;
    }
};

const actions = {
    login({commit}, user){
        axios.post('', {
            email: user.email,
            password: user.password
        })
        .then((response)=>{
            commit('SET_USER_TOKEN', response.data)
        })
        .catch((error) => {
            alert(error);
        })
    },
    register({commit}, user){
        axios.post('', {
            email: user.email,
            password: user.password
        })
        .then((response)=>{
            commit('SET_USER_TOKEN', response.data)
        })
        .catch((error) => {
            alert(error);
        })
    }
};

const mutations = {
    SET_USER_TOKEN(state, token){
        state.access_token = token;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}