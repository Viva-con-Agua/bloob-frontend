import { getField, updateField } from 'vuex-map-fields';

const getDefaultState = () => {
  return {
    to: [],
    subject: "",
    senderName: "", // Rename property to don't know
    senderMail: "", // Rename property to Reply to?
    body: ""
  }
}

const state = getDefaultState()

const actions = {
  resetMessageState ({ commit }) {
    commit("resetState");
  }
};

const getters = {
  getField
};

const mutations = {
  updateField,
  resetState(state) {
    /*
     * If you do not use assign, the object will loose observers and thus reactivity
     */
    Object.assign(state, getDefaultState());
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}