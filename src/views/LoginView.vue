<template>
  <div class="login">
    <h1 class="h1 my-4 text-center">{{ $t("LogIn") }}</h1>
    <v-form class="my-5" lazy-validation>
      <v-text-field
        type="email"
        variant="outlined"
        v-model="userLog.email"
        :label="$t('enterEmail')"
        :rules="[(v) => !!v || 'This field is required']"
      ></v-text-field>
      <v-text-field
        :type="passToggle == true ? 'password' : 'text'"
        variant="outlined"
        autocomplete="ON"
        v-model="userLog.password"
        :label="$t('enterPassword')"
        :rules="[(v) => !!v || 'This field is required']"
        ><span
          class="mdi passToggle"
          :class="{
            'mdi-eye-outline': passToggle,
            'mdi-eye-off-outline': !passToggle,
          }"
          @click="passToggle = !passToggle"
        ></span
      ></v-text-field>
    </v-form>
    <v-btn location="center" @click="toLogIn" class="my-4">
      {{ $t("LogIn") }}
    </v-btn>
  </div>
</template>
<script setup>
import { usemainStore } from "@/store/mainStore";
const store = usemainStore();
import { ref } from "vue";
import axios from "axios";
const userLog = ref({});
const passToggle = ref(true);
function toLogIn() {
  axios.get("csrf-cookie").then(() => {
    axios
      .post(`login`, userLog.value)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        store.user = res.data.user;
        store.setAuthHeaderNew(res.data.token);
        store.getUser();
        store.auth = true;
        store.startSnack("success", "home", "success");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error == "Error in email or password.") {
          store.startSnack("emailOrPassword", "no", "danger");
        } else {
          store.startSnack("error", "no", "danger");
        }
      });
  });
}
</script>
<style>
.login {
  max-width: 500px;
  margin: 5% auto;
}
.passToggle {
  position: relative;
  font-size: 35px;
  cursor: pointer;
}
.passToggle::before {
  position: absolute;
  right: -460px;
  top: -11px;
}
</style>
