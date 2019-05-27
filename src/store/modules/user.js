import axios from "axios";
import { getField } from "vuex-map-fields";

// const state = {
//   user: null,
//   pending: false,
//   error: null
// }

// Test user state as a prove of concept for the vuex store getter
const state = {
  user: {
    uuid: "c3702bf6-9e98-4b7b-957e-261ea12c552c",
    roles: [{ name: "employee" }, { name: "volunteer manager" }],
    crew: "Berlin",
    pillar: "education",
    mails: []
  },
  pending: false,
  error: null
};

const getters = {
  getField,
  // eslint-disable-next-line no-unused-vars
  get: (state, getters) => {
    return state.user;
  },
  is: state => roles => {
    var userRoles = state.user.roles.filter(
      role =>
        role.hasOwnProperty("name") &&
        !role.hasOwnProperty("crewName") &&
        !role.hasOwnProperty("pillar")
    );
    var supporterRoles = state.user.roles.filter(
      role =>
        role.hasOwnProperty("name") &&
        (role.hasOwnProperty("crewName") || role.hasOwnProperty("pillar"))
    );
    return roles.reduce((fulfills, role) => {
      var has = false;
      if (typeof role === "string" && role !== "VolunteerManager") {
        // searching for a simple role (admin, supporter or employee)
        has = userRoles.some(
          userRole => userRole.name.toLowerCase() === role.toLowerCase()
        );
      } else if (role === "VolunteerManager") {
        // The user has to be Volunteer Manager, but the pillar is not important
        has = supporterRoles.reduce(
          (found, supporterRole) => found || supporterRole.name === role,
          false
        );
      } else {
        // The user has to be Volunteer Manager with a concrete pillar or for a concrete crew
        has = supporterRoles.reduce(
          (found, supporterRole) =>
            found ||
            (supporterRole.name === role.name &&
              ((role.hasOwnProperty("crew") &&
                supporterRole.crewName === role.crew) ||
                !role.hasOwnProperty("crew")) &&
              ((role.hasOwnProperty("pillar") &&
                supporterRole.pillar === role.pillar) ||
                !role.hasOwnProperty("pillar"))),
          false
        );
      }
      return fulfills || has;
    }, false);
  },
  isError: state => {
    return state.error !== null;
  },
  getErrorCode: state => {
    var res = null;
    if (
      state.error !== null &&
      state.error.hasOwnProperty("response") &&
      state.error.response.hasOwnProperty("status")
    ) {
      res = state.error.response.status;
    }
    return res;
  }
};

const actions = {
  init(store) {
    // sets `state.loading` to true. Show a spinner or something.
    store.commit("API_USER_PENDING");

    return axios
      .get("/backend/bloob/identity")
      .then(response => {
        // sets `state.loading` to false
        // also sets `state.apiData to response`
        store.commit("API_USER_SUCCESS", response.data);
      })
      .catch(error => {
        // set `state.loading` to false and do something with error
        store.commit("API_USER_FAILURE", error);
      });
  },
  /**
   * Has to be called by all other AJAX requests, if they receive an [401 status code](https://tools.ietf.org/html/rfc7235#section-3.1).
   * If an ajax call receives a 401, the user has been logged out.
   *
   * Since all AJAX requests are executed by the VUEX store, this is a matter of accuracy.
   *
   * @author Johann Sell
   * @param store
   * @param error
   */
  logout(store, error) {
    store.commit("API_USER_LOGOUT", error);
  },
  // get email adresses available for this user
  getMails({ commit }) {
    var roleName = [];
    for (var i = 0; i < state.user.roles.length; i++) {
      roleName[i] = state.user.roles[i].name;
    }
    var pillar = state.user.pillar;
    var crewName = state.user.crew;
    // eslint-disable-next-line
    console.log("get mails for roles: "+roleName+" crew: "+crewName+" pillar: "+pillar);
    axios
      .post("backend/bloob/get", {
        roleName,
        pillar,
        crewName
      })
      .then(function(response) {
        // eslint-disable-next-line
          console.log('response from server: '+response.data);
        commit("setEmails", response.data);
      })
      .catch(function(error) {
        // eslint-disable-next-line
          console.log(error);
      });
  }
};

const mutations = {
  API_USER_PENDING(state) {
    state.user = null;
    state.pending = true;
    state.error = null;
  },
  API_USER_SUCCESS(state, user) {
    state.user = user;
    state.pending = false;
    state.error = null;
  },
  API_USER_FAILURE(state, error) {
    state.user = null;
    state.pending = false;
    state.error = error;
  },
  API_USER_LOGOUT(state, error) {
    state.user = null;
    state.pending = false;
    state.error = error;
  },
  setEmails(state, mails) {
    state.user.mails = [];
    for (var i = 0; i < mails.length; i++) {
      state.user.mails[i] = { mail: mails[i] };
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
