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
  doSubmitToBackend(rootState) {
    // eslint-disable-next-line
      console.log("sending post to backend for delivery")
    axios
      .post("/backend/bloob/send", {
        id: -1,
        senderUUID: rootState.rootState.user.user.uuid,
        senderName: state.senderName,
        senderMail: state.senderMail,
        senderCrew: rootState.rootState.user.user.crew,
        recipients: state.recipients,
        subject: state.subject,
        messageData: state.messageData,
        status: "pending"
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
  },
  getRecipients(state) {
    return state.recipients;
  }
};

const mutations = {
  updateField,
  addRecipients(state, autoCompleteMultiQuerySelection) {
    // eslint-disable-next-line
    console.log(autoCompleteMultiQuerySelection)
    state.recipients =  Array.from(autoCompleteMultiQuerySelection)
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
