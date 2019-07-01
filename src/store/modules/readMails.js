import { getField, updateField } from "vuex-map-fields";
import axios from "axios";

const getDefaultState = () => {
  return {
    mails: [],
    details: 0,
    busy: false
  };
};

const state = getDefaultState();

const actions = {
  doResetStateToDefault({ commit }) {
    commit("resetToDefault");
  },

  doShowDetails({ commit }, id) {
    // eslint-disable-next-line
      console.log("show Mail with id: "+id);
    commit("showMail", {
      id: id
    });
  },

  doGetAllMails({ commit }, showAll) {
    // eslint-disable-next-line
      console.log("get all mails");
    commit("resetToDefault");
    commit("setBusyTrue");
    var path = showAll
      ? "/backend/bloob/getAllMails"
      : "/backend/bloob/getMyMails";
    axios
      .get(path)
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          commit("addMail", {
            mail: response.data[i]
          });
        }
        commit("setBusyFalse");
      })
      .catch(function(error) {
        // eslint-disable-next-line
          console.log(error);
        commit("setBusyFalse");
      });
  }
};

const getters = {
  getField,
  getMails(state) {
    return state.mails;
  }
};

const mutations = {
  updateField,
  resetToDefault(state) {
    // If you do not use assign, the object will loose observers and thus reactivity
    Object.assign(state, getDefaultState());
  },
  addMail(state, mail) {
    state.mails.push(mail.mail);
  },
  showMail(state, id) {
    state.details = id.id;
  },
  setBusyTrue(state) {
    state.busy = true;
  },
  setBusyFalse(state) {
    state.busy = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
