import axios from 'axios'
//import router from './../../router'

const state = {
    caption_data: ''
};

const getters = {
    captionData: (state) => {
        return state.caption_data;
    }
};

const actions = {
    setCaptionData({commit}, caption){
        axios.post('api/Captions/PostCaption', {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            VideoID: caption.id,
            Data: caption.data
        })
        .then((response)=>{
            commit('SET_CAPTION_DATA', response.data)
        })
        .catch((error) => {
            console.log(error.response);
        })
    },
    getCaptionData({ commit }, videoId) {
        axios({
            method: 'get',
            url: 'api/Captions/' + videoId,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyIiwibmJmIjoxNTkxMzcwMjk0LCJleHAiOjE1OTE5NzUwOTQsImlhdCI6MTU5MTM3MDI5NH0.P5e3ERONFv-qkwqi7gBVVpzwE4n8FOD78LeyaB24rKM",
            },
        })
            .then((response) => {
                console.log(response.data)
                commit('SET_CAPTION_DATA', response.data)
            })
    },
    
};

const mutations = {
    SET_CAPTION_DATA(state, data){
        state.caption_data = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}