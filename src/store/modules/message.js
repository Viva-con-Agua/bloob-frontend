import { getField, updateField } from 'vuex-map-fields';

const getDefaultState = () => {
  return {
    recipients: [],
    subject: "",
    senderName: null,
    senderMail: "", // Rename property to Reply to?
    messageData: null
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
  addRecipient(state) {
    state.recipients.push("");
  },
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