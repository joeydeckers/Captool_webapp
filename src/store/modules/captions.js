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
        axios({
            method: 'post',
            url: 'https://i430817core.venus.fhict.nl/api/Captions',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data:{
                data: caption.data,
            }
        })
        .then((response)=>{
            commit('SET_CAPTION_DATA', response.data)
        })
        .catch((error) => {
            alert(error);
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