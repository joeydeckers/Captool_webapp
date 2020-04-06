import axios from 'axios'
//import router from './../../router'

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
        axios({
            method: 'post',
            url: 'https://i430817core.venus.fhict.nl/api/Users',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data:{
                email: user.email,
                password: user.password
            }
        })
        .then((response)=>{
            commit('SET_USER_TOKEN', response.data)
        })
        .catch((error) => {
            alert(error);
        })
    },
    register({commit}, user){
        axios.post('https://i430817core.venus.fhict.nl/api/Users/PostUser', {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
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