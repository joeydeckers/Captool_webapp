import axios from 'axios'

const state = {
    videos: [],
    video: {}
};

const getters = {
    allVideos: (state) => {
        return state.videos;
    },
    video: (state) => {
        return state.video;
    }
};

const actions = {
    fetchVideos({ commit }, playlist) {
        console.log("from store " + playlist);
        axios
            .get("https://cdn.jwplayer.com/v2/playlists/" + playlist, { //5TREJ3F2", { // todo: remove hardcoded playlist id
            })
            .then(response => {
                commit('SET_ALL_VIDEOS', response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    fetchVideo({ commit }, media_id) {
        axios
            .get("https://cdn.jwplayer.com/v2/media/" + media_id, {
            })
            .then(response => {
                commit('SET_VIDEO', response.data.playlist[0])
            })
            .catch(error => {
                console.log(error);
            });
    },
};

const mutations = {
    SET_ALL_VIDEOS(state, videos) {
        state.videos = videos;
    },
    SET_VIDEO(state, video) {
        state.video = video;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}