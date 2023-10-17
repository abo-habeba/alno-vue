<template>
  <div class="register">
    <h1 class="h1 my-4 text-center">{{ $t("register") }}</h1>
    <div class="alert alert-info" v-if="stations == 'getData'">
      {{ $t("getData") }}
    </div>
    <div class="alert alert-danger" v-else-if="stations == 'noData'">
      {{ $t("noData") }}
    </div>
    <v-form v-else lazy-validation>
      <v-text-field
        variant="outlined"
        :label="$t('enterName')"
        v-model="user.name"
        :rules="[(v) => !!v || 'This field is required']"
      ></v-text-field>
      <v-text-field
        type="email"
        variant="outlined"
        :label="$t('enterEmail')"
        :rules="[(v) => !!v || 'This field is required']"
        v-model="user.email"
      ></v-text-field>
      <v-text-field
        type="number"
        variant="outlined"
        :label="$t('enterTelephone')"
        :rules="[(v) => !!v || 'This field is required']"
        v-model="user.phone"
      ></v-text-field>
      <v-text-field
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
      <v-select
        label="اختر الوظيفة"
        :rules="[(v) => !!v || 'This field is required']"
        :items="Job_title"
        item-title="name"
        item-value="id"
        v-model="user.Job_title"
      ></v-select>
      <v-row>
        <v-col cols="10">
          <v-select
            :label="$t('SelectStation')"
            :rules="[(v) => !!v || 'This field is required']"
            :items="stations"
            :multiple="user.Job_title == 'engeneer' ? true : false"
            item-title="name"
            item-value="id"
            v-model="user.station_id"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-dialog min-width="70%" v-model="dialog" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn color="green" icon="mdi-plus" v-bind="props"> </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <h1 class="h1 my-4 text-center">
                  {{ $t("addStation") }}
                </h1>
                <v-form class="my-5">
                  <v-text-field
                    variant="outlined"
                    v-model="stationsadd.name"
                    :label="$t('name')"
                    :rules="[(v) => !!v || 'This field is required']"
                  ></v-text-field>
                </v-form>
                <v-btn
                  color="green"
                  location="center"
                  @click="submitAdd"
                  class="my-4"
                  >{{ $t("addStation") }}</v-btn
                >
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">{{
                  $t("close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-btn
        color="secondary"
        location="center"
        class="my-3"
        @click="toRegister"
        >{{ $t("register") }}</v-btn
      >
    </v-form>
    <div>
      <span>{{ $t("gotoAccount") }}</span>
      <router-link to="/auth/login">{{ $t("LogIn") }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { usemainStore } from "@/store/mainStore";
const store = usemainStore();
import axios from "axios";
import { onMounted, ref } from "vue";
const stations = ref(["getData"]);
const user = ref({});
const stationsadd = ref({});
const dialog = ref();
const Job_title = ref([
  { id: "engeneer", name: "مهندس" },
  { id: "technician", name: "فني" },
]);
onMounted(() => {
  axios
    .get(`Stations`)
    .then((res) => {
      stations.value = res.data;
    })
    .catch(() => {
      stations.value = "noData";
      store.startSnack("noData", "no", "danger");
    });
});
function toRegister() {
  axios
    .post(`register`, user.value)
    .then(() => {
      console.log("res.data");
      store.startSnack("success", "login", "success");
    })
    .catch(() => {
      store.startSnack("error", "no", "danger");
    });
}
function submitAdd() {
  axios
    .post(`Stations`, stationsadd.value)
    .then((res) => {
      const nwestations = res.data.Stations;
      stations.value.push(nwestations);
      stationsadd.value = "";
      dialog.value = false;
      store.startSnack("success", "no", "success");
      user.value.station_id = nwestations.id;
    })
    .catch(() => {
      store.startSnack("error", "no", "danger");
    });
}
</script>
<style>
.register {
  margin: 5% auto;
}
</style>
