import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import videos from './modules/videos'
import captions from './modules/captions'
import profile from './modules/profile'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    videos,
    captions,
    profile
  }
})
