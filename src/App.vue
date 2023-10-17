<template>
  <v-app>
    <v-main>
      <div class="container">
        <NavComponent v-if="store.auth" />
        <SnackbarComponent />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";
import NavComponent from "@/components/NavComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";
// import FooterComponent from "@/components/FooterComponent.vue";
import { usemainStore } from "@/store/mainStore";
const store = usemainStore();
console.log(window.location.origin);
const BASE_URL =
  window.location.origin === "http://localhost:8080"
    ? "http://127.0.0.1:8000/api/"
    : "https://api.hwnix.com/api/";
console.log(BASE_URL);
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
onMounted(() => {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = true;
  store.setAuthHeaderNew(localStorage.token);
  store.getUser();
});
function eventOffset() {
  store.getUser();
  store.getReports();
}
window.addEventListener("beforeunload", function (event) {
  if (event.pageYOffset === 0) {
    event.preventDefault();
    event.returnValue = "";
    eventOffset();
  }
});
</script>
<style>
.clickd {
  cursor: pointer !important;
}
</style>
