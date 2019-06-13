import { updateField, getField } from "vuex-map-fields";
//import axios from "axios";

const getDefaultState = () => {
  return {
    
    
  };
};

const state = getDefaultState();

//const action {};

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
  };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  