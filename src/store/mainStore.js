import axios from "axios";
import { defineStore } from "pinia";
export const usemainStore = defineStore("mainStore", {
  state: () => ({
    passToggle: true,
    auth: false,
    user: localStorage.user ? JSON.parse(localStorage.user) : false,
    reports: ["getData"],
    snackbar: false,
    redirect: false,
    text: " ",
    coler: "success",
    urlDirec: " ",
    timeout: 1500,
  }),
  actions: {
    setAuthHeaderNew(token) {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .get(`check`)
          .then(() => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            this.auth = true;
          })
          .catch((e) => {
            console.log(e, ".get(`check`) catch((e)");
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.auth = false;
            this.startSnack("error", "login", "danger");
          });
      } else {
        console.log("check else if (token) {");
        delete axios.defaults.headers.common["Authorization"];
        this.startSnack("error", "login", "danger", false);
        this.auth = false;
      }
    },
    startSnack(
      text,
      urlDirect,
      coler = "success",
      snack = true,
      timeout = 1500
    ) {
      this.text = text;
      this.coler = coler;
      this.urlDirec = urlDirect;
      this.timeout = timeout;
      this.snackbar = snack;
      this.redirect = true;
    },
    getUser() {
      if (this.user.id) {
        axios
          .get(`users/${JSON.parse(localStorage.user).id}`)
          .then((res) => {
            this.user = res.data;
          })
          .catch((e) => {
            console.log(e);
            this.startSnack("error", "no", "danger");
          });
      }
    },
    getReports() {
      axios
        .get(`user/${this.user.id}/reports`)
        .then((res) => {
          if (res.data.length == 0) {
            this.reports = ["noData"];
          } else {
            this.reports = res.data;
          }
        })
        .catch(() => {
          this.reports = ["noData"];
          this.startSnack("error", "no", "danger");
        });
    },
  },
});
