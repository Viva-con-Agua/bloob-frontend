import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reciever: [],
    sender_name: "",
    sender_mail: "",
    subject: "",
    message: ""
  },
  mutations: {
    AddReciever(state, n) {
      state.reciever.push(n);
    },
    SetReciever(state, n) {
      state.reciever = n;
    },
    sender_name(state, n) {
      state.sender_name = n;
    },
    sender_mail(state, n) {
      state.sender_mail = n;
    },
    subject(state, n) {
      state.subject = n;
    },
    message(state, n) {
      state.message = n;
    }
  },
  actions: {}
});
