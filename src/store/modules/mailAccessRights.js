import { updateField, getField } from "vuex-map-fields";

const getDefaultState = () => {
  return {
    form: {
      roleName: "",
      pillar: "",
      crewName: ""
    }
  };
};

const state = getDefaultState();

const actions = {
  doResetMailAccessRightsToDefault({ commit }) {
    commit("resetMailAccessRightsToDefault");
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
  resetMailAccessRightsToDefault(state) {
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
