<template>
  <div class="register">
    <h1 class="h1 my-5 text-center">{{ $t("editProfil") }}</h1>
    <v-form lazy-validation>
      <v-text-field
        variant="outlined"
        :label="$t('enterName')"
        v-model="user.name"
        :rules="[(v) => !!v || 'This field is required']"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        :label="$t('enterEmail')"
        :rules="[(v) => !!v || 'This field is required']"
        v-model="user.email"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        type="number"
        :label="$t('enterTelephone')"
        :rules="[(v) => !!v || 'This field is required']"
        v-model="user.phone"
      ></v-text-field>
      <v-btn
        style="color: wheat"
        location="center"
        class="my-3 btn-password"
        @click="editPass = !editPass"
        >{{ !editPass ? $t("changePassword") : $t("noChangePassword") }}</v-btn
      >
      <v-text-field
        v-if="editPass"
        :type="store.passToggle == true ? 'password' : 'text'"
        :append-inner-icon="
          store.passToggle ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
        "
        @click:appendInner="store.passToggle = !store.passToggle"
        variant="outlined"
        autocomplete="ON"
        v-model="user.password"
        :label="$t('enterPassword')"
        :rules="[(v) => !!v || 'This field is required']"
      ></v-text-field>
    </v-form>
    <v-btn
      color="secondary"
      location="center"
      class="my-3"
      @click="editProfil"
      >{{ $t("save") }}</v-btn
    >
  </div>
</template>

<script setup>
import { usemainStore } from "@/store/mainStore";
const store = usemainStore();
import axios from "axios";
import { ref } from "vue";
const user = ref(store.user);
const editPass = ref(false);
function editProfil() {
  axios
    .put(`users/${store.user.id}`, user.value)
    .then(() => {
      console.log("editProfil.then");
      store.startSnack("success", "no", "success");
      if (user.value.password) {
        store.logout();
      }
    })
    .catch(() => {
      store.startSnack("error", "no", "danger");
    });
}
</script>
<style>
.btn-password {
  color: white !important;
  background-color: #ff5722 !important;
  position: sticky !important;
  right: 20%;
  bottom: 50%;
}
</style>
