import axios from "axios";
import { defineStore } from "pinia";
export const usemainStore = defineStore("mainStore", {
  state: () => ({
    auth: false,
    user: localStorage.user ? JSON.parse(localStorage.user) : false,
    reports: ["getData"],
    snackbar: false,
    text: " ",
    coler: "success",
    urlDirec: " ",
    setTime: " ",
  }),
  actions: {
    setAuthHeaderNew(token) {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .get(`check`)
          .then((res) => {
            console.log(res.data);
            if (res.data == true) {
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
              this.auth = true;
            } else {
              delete axios.defaults.headers.common["Authorization"];
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              this.auth = false;
              this.startSnack("error", "login", "danger");
            }
          })
          .catch((e) => {
            console.log(e);
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.auth = false;
            this.startSnack("error", "login", "danger");
          });
      } else {
        console.log("else check");
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
      setTime = 1000
    ) {
      this.text = text;
      this.coler = coler;
      this.urlDirec = urlDirect;
      this.setTime = setTime;
      this.snackbar = snack;
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
