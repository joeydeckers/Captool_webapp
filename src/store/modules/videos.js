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
    fetchVideos({ commit }) {
        axios
            .get("https://cdn.jwplayer.com/v2/playlists/pcNG01c7", { // todo: remove hardcoded playlist id
            })
            .then(response => {
                commit('SET_ALL_VIDEOS', response.data)
            })
            .catch(error => {
                alert(error);
            });
    },
    fetchVideo({ commit }, media_id) {
        axios
            .get("https://cdn.jwplayer.com/v2/media/" + media_id, {
            })
            .then(response => {
                commit('SET_VIDEO', response.data.playlist[0]) // todo: find out why a media item has a playlist
            })
            .catch(error => {
                alert(error);
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