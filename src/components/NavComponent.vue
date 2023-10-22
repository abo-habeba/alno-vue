<template>
  <div>
    <nav class="fixed-top navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">{{ $t("home") }}</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">
                {{ $t("home") }}
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link d-f-c"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="mdi mdi-arrow-down-bold"></span>
                {{ store.user.name }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="nav-link" to="/user/edit">{{
                    $t("editProfil")
                  }}</router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="nav-link" @click="toLogout">
                    {{ $t("logOut") }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { usemainStore } from "@/store/mainStore";
import axios from "axios";
const store = usemainStore();
function toLogout(e) {
  const myButton = e.currentTarget;
  myButton.disabled = true;
  myButton.style.cursor = "progress";
  axios
    .post(`logout`)
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      store.setAuthHeaderNew();
      store.startSnack("success", "login", "success", false);
      store.auth = false;
    })
    .catch(() => {
      store.startSnack("error", "no", "danger");
      myButton.disabled = false;
      myButton.style.cursor = "default";
    });
}
</script>
<style scoped>
.navbar {
  padding: 0px !important;
}
.navbar-toggler {
  border: none !important;
}
@media screen and (max-width: 990px) {
  .nav-item .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-link {
    margin: 3px auto;
    background-color: rgb(229, 236, 229) !important;
    border: 2px solid burlywood !important;
    flex-direction: column;
    cursor: pointer;
  }
  .dropdown-menu .nav-link {
    width: 90%;
  }
  .navbar-nav .dropdown-menu {
    width: 100%;
    border: none;
  }
}
.d-f-c {
  display: flex !important;
  flex-direction: row;
  align-items: center !important;
  justify-content: center !important;
  align-content: center !important;
}
</style>
