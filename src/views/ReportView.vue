<template>
  <div>
    <h1 class="h1 mt-5 text-center">
      {{ $t("report") }} [ {{ router.params.id }} ]
    </h1>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-center m-4">{{ $t("confirm") }}</v-card-title>
        <div class="mx-auto">
          <v-btn class="m-5" color="green" text @click="deleteReport()">{{
            $t("yes")
          }}</v-btn>
          <v-btn class="m-5" color="red" text @click="dialog = false">{{
            $t("no")
          }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <div class="alert alert-info text-center" v-if="report == 'getData'">
      {{ $t("getData") }}
    </div>
    <div
      class="alert alert-warning text-center"
      v-else-if="report == 'noreport'"
    >
      {{ $t("noReport") }}
    </div>
    <div v-else>
      <v-card color="grey-lighten-2 p-3">
        <v-card-title>
          <v-chip>{{ report.user.name }}</v-chip>
          <v-chip class="float-right">{{ report.station.name }}</v-chip>
        </v-card-title>
        <v-card-text class="my-2 text-content">{{ report.body }}</v-card-text>
        <v-chip>{{ date(report.created_at) }}</v-chip>
        <v-chip class="float-right">{{
          timeSinceReport(report.created_at)
        }}</v-chip>
        <v-card-actions class="mt-2">
          <v-textarea
            variant="outlined"
            :rows="1"
            auto-grow
            :label="$t('comment')"
            v-model="report.comment"
          />
          <v-btn icon="mdi-send" @click="addComment(report)"></v-btn>
        </v-card-actions>
        <div class="comment-length float-right">
          <span class="mdi mdi-comment-outline"></span>
          <span class="m-1">{{ report.comments.length }}</span>
        </div>
        <div
          v-if="report.user.id == store.user.id"
          class="comment-length float-right mx-4"
        >
          <span
            class="clickd mdi mdi-delete-outline"
            @click="deleted(report.id)"
          ></span>
        </div>
        <v-card
          class="mb-3 p-3 w-100"
          color="grey-lighten-4"
          v-for="(comment, i) in report.comments"
          :key="i"
        >
          <v-chip>{{ comment.user.name }}</v-chip>
          <div class="text-content">>{{ comment.body }}</div>
          <span class="float-right">{{
            timeSinceReport(comment.created_at)
          }}</span>
        </v-card>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const router = useRoute();
import { usemainStore } from "@/store/mainStore";
const store = usemainStore();
import { onMounted, ref } from "vue";
import axios from "axios";
import moment from "moment";
moment.locale(localStorage.language + "-dz");
const report = ref("getData");
const dialog = ref(false);
function getReport() {
  axios
    .get(`reports/${router.params.id}`)
    .then((res) => {
      report.value = res.data;
    })
    .catch(() => {
      report.value = "noreport";
    });
  console.log(report);
}
onMounted(() => {
  axios
    .get(`reports/${router.params.id}`)
    .then((res) => {
      report.value = res.data;
    })
    .catch(() => {
      report.value = "noreport";
    });
});
function timeSinceReport(time) {
  return moment(time).fromNow();
}
function date(d) {
  return moment(d).format("dddd :- h:mm A - MM/DD ");
}
function addComment(report) {
  const obComment = {
    body: report.comment,
    report_id: report.id,
    user_id: store.user.id,
  };
  axios
    .post(`Comments`, obComment)
    .then(() => {
      store.getReports();
      getReport();
      report.comment = "";
    })
    .catch(() => {
      store.startSnack("error", "no", "danger");
    });
}
function deleted() {
  dialog.value = true;
}
function deleteReport() {
  axios.delete(`reports/${router.params.id}`).then(() => {
    dialog.value = false;
    store.startSnack("success", "back", "success");
    store.getReports();
  });
}
window.addEventListener("beforeunload", function (event) {
  if (event.pageYOffset === 0) {
    event.preventDefault();
    event.returnValue = "";
    getReport();
  }
});
</script>
<style scoped>
.comment-length {
  font-size: 25px;
}
</style>
