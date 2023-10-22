<template>
  <div class="mt-3">
    <h1 class="h1 mt-5 text-center">{{ $t("reports") }}</h1>
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
    <div
      class="alert alert-info text-center"
      v-if="store.reports[0] == 'getData'"
    >
      {{ $t("getData") }}
    </div>
    <div
      class="alert alert-warning text-center"
      v-else-if="store.reports[0] == 'noData'"
    >
      {{ $t("noData") }}
    </div>
    <div v-else>
      <v-card
        color="grey-lighten-2"
        class="my-3 p-3"
        v-for="(report, i) in store.reports"
        :key="i"
      >
        <router-link class="nav-link" :to="`/report/${report.id}`">
          <div id="textShare">
            <v-card-title>
              <v-chip>{{ report.user.name }}</v-chip>
              <v-chip class="float-right">{{ report.station.name }}</v-chip>
            </v-card-title>
            <v-card-text class="my-2 text-content">{{
              report.body
            }}</v-card-text>
            <v-chip>{{ date(report.created_at) }}</v-chip>
            <v-chip class="float-right">{{
              timeSinceReport(report.created_at)
            }}</v-chip>
          </div>
        </router-link>
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
          <div v-if="report.user.id == store.user.id" class="float-right mx-4">
            <span
              class="clickd mdi mdi-delete-outline"
              @click="deleted(report.id)"
            ></span>
          </div>
          <span
            class="mx-3 clickd mdi mdi-share-outline"
            @click="share(report)"
          ></span>
        </div>
        <v-btn
          class="mb-2"
          @click="report.showComments = !report.showComments"
          >{{
            report.showComments ? $t("hideComments") : $t("showComments")
          }}</v-btn
        >
        <v-card
          class="mb-3 p-3"
          color="grey-lighten-4"
          v-for="(comment, i) in report.comments.slice(
            0,
            report.showComments ? report.comments.length : 1
          )"
          :key="i"
        >
          <v-chip>{{ comment.user.name }}</v-chip>
          <div class="text-content">{{ comment.body }}</div>
          <span class="float-right">{{
            timeSinceReport(comment.created_at)
          }}</span>
        </v-card>
        <p>{{ xx }}</p>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import { usemainStore } from "@/store/mainStore";
const store = usemainStore();
import { onMounted, ref } from "vue";
import axios from "axios";
import moment from "moment";
moment.locale(localStorage.language + "-dz");
const reportId = ref(" ");
const dialog = ref(false);
const xx = ref("");
onMounted(() => {
  store.getReports();
});
function share(report) {
  const textShare = document.getElementById("textShare").innerText;
  const obComment = {
    text: textShare + "\n",
    url: window.location.origin + "/report/" + report.id,
  };
  navigator.share(obComment);
}
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
      report.comment = "";
    })
    .catch(() => {
      store.startSnack("error", "no", "danger");
    });
}
function deleted(id) {
  reportId.value = id;
  dialog.value = true;
}
function deleteReport() {
  axios.delete(`reports/${reportId.value}`).then(() => {
    dialog.value = false;
    store.startSnack("success", "no", "success");
    store.getReports();
  });
}
</script>
<style scoped>
.comment-length {
  width: 100%;
}
.comment-length span {
  font-size: 25px;
}
</style>
