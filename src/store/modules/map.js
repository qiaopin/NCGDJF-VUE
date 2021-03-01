// import { resetRouter } from '@/router'
const state = {
  mapType: "sl"
}

const actions = {
  changeType({ commit }, mapType) {
    commit('mapType', mapType)
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

