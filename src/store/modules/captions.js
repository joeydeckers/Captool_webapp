import axios from 'axios'
//import router from './../../router'

const state = {
    caption_data: '',
    caption: ''
};

const getters = {
    captionData: (state) => {
        return state.caption_data;
    },
    captionVTT: (state) => {
        return state.caption;
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
        axios.get('api/Captions/GetCaption/' + videoId, {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
        .then(response => {
            commit('SET_CAPTION_DATA', response.data)
        })
    },
    getCaption({ commit }, videoId, access_token) {
        axios.get('api/Captions/' + videoId, {
            headers: {
                Authorization: "Bearer " + access_token,
            },
        })
        .then(response => {
            commit('SET_CAPTION', response.data)
        })
    },
};

const mutations = {
    SET_CAPTION_DATA(state, data){
        state.caption_data = data;
    },
    SET_CAPTION(state, data){
        state.caption = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}