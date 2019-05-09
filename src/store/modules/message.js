import { getField, updateField } from "vuex-map-fields";

const getDefaultState = () => {
  return {
    recipients: [],
    subject: "",
    senderName: null,
    senderMail: null,
    messageData: null
  };
};

const state = getDefaultState();

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
  getMessageData(state) {
    return state.messageData;
  }
};

const mutations = {
  updateField,
  addRecipient(state) {
    state.recipients.push("");
  },
  updateMessageData(state, updatedMessageData) {
    state.messageData = updatedMessageData;
  },
  resetMessageStateToDefault(state) {
    // If you do not use assign, the object will loose observers and thus reactivity
    Object.assign(state, getDefaultState());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
