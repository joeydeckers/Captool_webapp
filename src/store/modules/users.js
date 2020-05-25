import axios from 'axios'
import router from './../../router'

const state = {
    token: '' || localStorage.getItem('capToolToken')
};

const getters = {
    getAccesToken: (state) => {
        return state.token;
    }
};

const actions = {
    login({commit}, user){
        axios({
            method: 'post',
            url: 'https://i346784core.venus.fhict.nl/api/Users/Login',
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
            commit('SET_USER_TOKEN', response.data.token);
            localStorage.setItem('capToolToken', response.data.token);
            setTimeout(() => {
                router.push({name: 'Dashboard'});
            }, 500);
        })
        .catch((error) => {
            alert(error);
        })
    },
    register({commit}, user){
        axios.post('https://i346784core.venus.fhict.nl/api/Users/PostUser', {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            email: user.email,
            password: user.password,
            name: user.name
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
        state.token = token;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}