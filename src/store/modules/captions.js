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
        axios.get('api/Captions/GetCaption/' + videoId, {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
        .then(response => {
            commit('SET_CAPTION_DATA', response.data)
        })
        .catch(error => {
            alert(error);
        });
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