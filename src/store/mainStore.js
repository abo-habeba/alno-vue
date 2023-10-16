import axios from "axios";
import { defineStore } from "pinia";
export const usemainStore = defineStore("mainStore", {
  state: () => ({
    auth: false,
    user: localStorage.user ? JSON.parse(localStorage.user) : false,
    reports: ["getData"],
    snackbar: true,
    text: " ",
    coler: "success",
    urlDirec: " ",
    timeout: 1500,
  }),
  actions: {
    setAuthHeaderNew(token) {
      console.log("setAuthHeaderNew");
      if (token) {
        console.log("check if (token)");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .get(`check`)
          .then((res) => {
            console.log(res, ".get(`check`).then((res)");
            if (res.data) {
              console.log(
                res.data,
                ".get(`check`).then((res)  if (res.data == true)"
              );
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
              this.auth = true;
            } else {
              console.log(res.data, ".get(`check`).then((res)  if  else ");
              delete axios.defaults.headers.common["Authorization"];
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              this.auth = false;
              this.startSnack("error", "login", "danger");
            }
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
      snack = false,
      timeout = 1500
    ) {
      this.text = text;
      this.coler = coler;
      this.urlDirec = urlDirect;
      this.timeout = timeout;
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
