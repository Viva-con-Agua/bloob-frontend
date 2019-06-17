import { getField, updateField } from "vuex-map-fields";
import axios from "axios";

const getDefaultState = () => {
  return {
    mails: []
  };
};

const state = getDefaultState();

const actions = {
  doResetStateToDefault({ commit }) {
    commit("resetToDefault");
  },

  doGetAllMails({ commit }) {
    axios
      .get("/backend/bloob/getAllMails")
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          commit("addMail", {
            mail: response.data[i]
          });
        }
      })
      .catch(function(error) {
        // eslint-disable-next-line
          console.log(error);
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
