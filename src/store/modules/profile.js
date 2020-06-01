import axios from 'axios'

const state = {
    user: {},
};

const getters = {
    getUser: (state) => {
        return state.user;
    }
};

const actions = {
    fetchUser({commit}, access_token){
        axios({
            method: 'get',
            url: 'api/Users/GetUser',
            headers: {
                Authorization: "Bearer " + access_token,
            },
        })
        .then((response)=>{
            commit('SET_USER', response.data);
        })
        .catch((error) => {
            alert(error);
        })
    },
};

const mutations = {
    SET_USER(state, user){
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}