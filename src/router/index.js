import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import Register from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import StationsView from "../views/StationsView.vue";
import userEdit from "../views/user/editProfil";
import ReportView from "../views/ReportView.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home" },
    children: [
      {
        path: "stations",
        name: "stations",
        component: StationsView,
        meta: { title: "Stations" },
      },
    ],
  },
  {
    path: "/user/edit",
    name: "userEdit",
    component: userEdit,
    meta: { title: "User Edit" },
  },
  {
    path: "/report/:id",
    name: "report",
    component: ReportView,
    meta: { title: "Report" },
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
    meta: { title: "Auth" },
    children: [
      {
        path: "register",
        name: "register",
        component: Register,
        meta: { title: "Register" },
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
        meta: { title: "Log In" },
      },
    ],
  },
  {
    path: "/:path(.*)*",
    name: "notfound",
    component: NotFound,
    meta: { title: "Not Found" },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "atsh";
  const token = localStorage.getItem("token");
  if (token) {
    // التوكن موجود، يتم توجيه المستخدم إلى الصفحة الرئيسية
    if (to.name === "login" || to.name === "register" || to.name === "auth") {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    // التوكن غير موجود، يتم توجيه المستخدم إلى صفحة تسجيل الدخول
    if (to.name !== "auth" && to.name !== "login" && to.name !== "register") {
      next({ name: "login" });
    } else {
      next();
    }
  }
});
export default router;
