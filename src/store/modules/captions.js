import axios from 'axios'
//import router from './../../router'

const state = {
    caption_data: ''
};

const getters = {
    getCaptionData: (state) => {
        return state.caption_data;
    }
};

const actions = {
    setCaptionData({commit}, caption){
        axios.post('https://i346784core.venus.fhict.nl/api/Captions/PostCaption', {
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
    }
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