<template>
  <div class="text-center">
    <v-snackbar
      location="top"
      class="text-content"
      :color="store.coler"
      v-model="store.snackbar"
      :timeout="store.timeout"
    >
      {{ $t(store.text) }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="store.snackbar = false">
          {{ $t("close") }}
        </v-btn>
      </template>
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
  () => store.redirect,
  (isredirect) => {
    if (isredirect) {
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
        store.redirect = false;
      }, store.timeout);
    }
  }
);
</script>
