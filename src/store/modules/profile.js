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
    fetchUser({ commit }, access_token) {
        axios({
            method: 'get',
            url: 'api/Users/GetUser',
            headers: {
                Authorization: "Bearer " + access_token,
            },
        })
            .then((response) => {
                commit('SET_USER', response.data);
            })
            .catch((error) => {
                alert(error);
            })
    },
    updateUser({ commit }, { access_token, user }) {
        console.log(access_token);
        console.log(user);
        axios({
            method: 'put',
            url: 'api/Users/UpdateUser',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + access_token,
            },
            data: {
                name: user.name,
                email: user.email,
                playlist: user.playlist,
                password: user.password
            }
        })
            .then((response) => {
                commit('SET_USER', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}