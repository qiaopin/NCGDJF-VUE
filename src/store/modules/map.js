// import { resetRouter } from '@/router'
const state = {
  mapType: "sl",
  tcArr: []
}

const actions = {
  changeType({ commit }, mapType) {
    commit('mapType', mapType)
  },
  changeTCArr({ commit }, arr) {
    commit('tcArr', arr)
  }
}

const mutations = {
  SET_MAPTYPE: (state, mapType) => {
    state.mapType = mapType
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}

