import Vue from "vue";
import Vuex from "vuex";
import message from "./modules/message";
import user from "./modules/user";
import mailAccessRights from "./modules/mailAccessRights";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    message,
    user,
    mailAccessRights
  },
  strict: debug
});
