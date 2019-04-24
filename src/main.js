import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import { WidgetUserAutocomplete } from "vca-widget-user";
import {
  WidgetTopNavigation,
  WidgetBottomNavigation
} from "vca-widget-navigation";
import router from "./router";
import VueI18n from "vue-i18n";
import en from "@/lang/en_US.json";
import de from "@/lang/de_DE.json";
import enElement from "element-ui/lib/locale/lang/en";
import deElement from "element-ui/lib/locale/lang/de";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {}); // config is optional

const dateTimeFormats = {
  "en-US": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  "de-DE": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  }
};

Vue.use(VueI18n);

const locale = navigator.language;
const i18n = new VueI18n({
  locale: locale,
  dateTimeFormats,
  messages: {
    "en-US": Object.assign(en, enElement),
    "de-DE": Object.assign(de, deElement),
    de: Object.assign(de, deElement),
    en: Object.assign(en, enElement)
  }
});

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(WidgetUserAutocomplete, { i18n: i18n });
Vue.use(WidgetBottomNavigation, { i18n: i18n });
Vue.use(WidgetTopNavigation, { i18n: i18n });

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// only for init - checks if there is already a user, initiates OAuth handshake otherwise
var u = store.getters["user/get"];
if (u === null) {
  // Handshake!
  store.dispatch("user/init").then(() => {});
}

new Vue({
  router,
  i18n,
  show: true,
  components: {
    WidgetUserAutocomplete,
    WidgetTopNavigation,
    WidgetBottomNavigation
  },
  store,
  render: h => h(App)
}).$mount("#app");
