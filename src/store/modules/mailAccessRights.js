import { updateField, getField } from "vuex-map-fields";
import axios from "axios";

const getDefaultState = () => {
  return {
    form: {
      roleName: "",
      pillar: "",
      //uuid of crew shuld be used
      crewName: "",
      email: ""
    },
    allAccessRights: [],
    //existing roles and pillars should be recieved from another microservice and not hardoced - see Issue#9
    allRoles: ["supporter", "employee", "admin", "volunteer manager"],
    allPillars: ["education", "network", "finance", "operation"]
  };
};

const state = getDefaultState();

const actions = {
  doResetMailAccessRightsFormToDefault({ commit }) {
    commit("resetMailAccessRightsFormToDefault");
  },
  // send a new access right to the backend to be added to the database
  doSubmitToBackend() {
    // eslint-disable-next-line
      console.log("sending post to backend")
    axios
      .post("/backend/bloob/create", {
        // generic id, only used to build a structural verfiable access right; actual id is set in the backend
        id: 1,
        roleName: state.form.roleName,
        // only volunteer manager uses the pillar information
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
  // get a list of all mail access rights for all roles, pillars, crews
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
  },
  // delete the access right with this id from the database
  // without the unused commit the id parameter is not passed properly
  // eslint-disable-next-line no-unused-vars
  doDeleteAccessRight({ commit }, id) {
    // eslint-disable-next-line
      console.log("delete "+id);
    axios
      .post("backend/bloob/delete", { id })
      .then(function(response) {
        // eslint-disable-next-line
          console.log('deleted'+response);
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