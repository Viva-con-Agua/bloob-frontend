import { getField, updateField } from "vuex-map-fields";
import axios from "axios";

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
  },
  doSubmitToBackend() {
    // eslint-disable-next-line
      console.log("sending post to backend for delivery")
    axios
      .post("/backend/bloob/send", {
        recipients: state.recipients,
        subject: state.subject,
        senderName: state.senderName,
        senderMail: state.senderMail,
        messageData: state.messageData
      })
      .then(function(response) {
        // eslint-disable-next-line
          console.log(response);
      })
      .catch(function(error) {
        // eslint-disable-next-line
          console.log(error);
      });
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
