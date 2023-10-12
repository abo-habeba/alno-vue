<template>
  <div class="text-center ma-2">
    <v-snackbar :color="store.coler" location="top" v-model="store.snackbar">
      <v-row>
        <v-col class="text-center" cols="12">
          <h6 class="text-center">{{ $t(store.text) }}</h6>
        </v-col>
        <v-col class="d-flex align-items-center justify-content-center">
          <v-btn class="m-2" variant="outlined" @click="store.snackbar = false">
            {{ $t("close") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-snackbar>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { usemainStore } from "@/store/mainStore";
import { watch } from "vue";
const store = usemainStore();
watch(
  () => store.snackbar,
  (isSnack) => {
    if (isSnack) {
      setTimeout(() => {
        if (store.urlDirec == "back") {
          router.go(-1);
        } else if (store.urlDirec == "home") {
          router.push({ path: "/" });
        } else if (store.urlDirec == "login") {
          router.push({ path: "auth/login" });
        } else if (store.urlDirec == "no") {
          ("no");
        } else {
          router.push({ path: store.urlDirec });
        }
      }, store.setTime);
    }
  }
);
</script>
