import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const vuetify = createVuetify({
  components,
  directives,
});
let language = navigator.language;
localStorage.setItem("language", language);
window.onlanguagechange = () => {
  language = navigator.language;
  localStorage.setItem("language", navigator.language);
};
const i18n = createI18n({
  locale: navigator.language,
  messages: {
    en: en,
    ar: ar,
  },
});
createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount("#app");
