import { updateField, getField } from "vuex-map-fields";
import axios from "axios";

const getDefaultState = () => {
  return {
    form: {
      roleName: "",
      pillar: "",
      crewName: "",
      email: ""
    },
    allAccessRights: []
  };
};

const state = getDefaultState();

const actions = {
  doResetMailAccessRightsFormToDefault({ commit }) {
    commit("resetMailAccessRightsFormToDefault");
  },
  doSubmitToBackend() {
    // eslint-disable-next-line
      console.log("sending post to backend")
    axios
      .post("/backend/bloob/create", {
        id: 1,
        roleName: state.form.roleName,
        pillar:
          state.form.roleName == "volunteer manager" ? state.form.pillar : "",
        crewName: state.form.crewName,
        email: state.form.email
      })
      .then(function(response) {
        // eslint-disable-next-line
          console.log(response);
      })
      .catch(function(error) {
        // eslint-disable-next-line
          console.log(error);
      });
  },
  doGetAllAccessRights({ commit }) {
    axios
      .get("/backend/bloob/all")
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          commit("addMailAccessRight", {
            mailAccessRight: response.data[i]
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
  getMessageData(state) {
    return state.form.roleName;
  }
};

const mutations = {
  updateField,
  resetMailAccessRightsFormToDefault(state) {
    // If you do not use assign, the object will loose observers and thus reactivity
    Object.assign(state, getDefaultState());
  },
  addMailAccessRight(state, mailAccessRight) {
    state.allAccessRights.push(mailAccessRight.mailAccessRight);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
