const state = {
  to: [],
  subject: "",
  senderName: "", // Rename to don't know
  senderMail: "", // Rename to Reply to?
  body: ""
}

const getters = {

}

const actions = {

}

const mutations = {
  addTo(state, n) {
    state.to.push(n);
  },
  senderName(state, n) {
    state.senderName = n;
  },
  senderMail(state, n) {
    state.senderMail = n;
  },
  subject(state, n) {
    state.subject = n;
  },
  body(state, n) {
    state.body = n;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}