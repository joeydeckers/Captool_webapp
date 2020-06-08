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
        axios({
            method: 'post',
            url: 'api/Captions/PostCaption',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + localStorage.capToolToken,
            },
            data: {
                VideoID: caption.id,
                Caption: caption.data
            }
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
                "Authorization": "Bearer " + localStorage.capToolToken,
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