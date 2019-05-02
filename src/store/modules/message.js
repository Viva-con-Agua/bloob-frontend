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
  doUpdateMessageData({ commit }, updatedMessageData) {
    commit("updateMessageData", updatedMessageData);
  },
  doResetMessageStateToDefault({ commit }) {
    commit("resetMessageStateToDefault");
  }
};

const getters = {
  getField,
  getMessageBody(state) {
    return state.messageBody;
  }
};

const mutations = {
  updateField,
  addRecipient(state) {
    state.recipients.push("");
  },
  updateMessageBody(state, updatedMessageData) {
    state.messageData = updatedMessageData;
  },
  resetMessageStateToDefault(state) {
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