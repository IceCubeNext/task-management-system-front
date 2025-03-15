import { createRouter, createWebHashHistory } from "vue-router";

import Task from "./views/task-page.vue";
import Profile from "./views/profile-page";
import defaultLayout from "./layouts/side-nav-outer-toolbar";
import simpleLayout from "./layouts/single-card";
import CommentPage from "@/views/comment-page.vue";

function loadView(view) {
  return () => import (/* webpackChunkName: "login" */ `./views/${view}.vue`)
}

const router = new createRouter({
  routes: [
    {
      path: "/tasks",
      name: "tasks",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Task
    },
    {
      path: "/tasks/:id/comments",
      name: "comments",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: CommentPage
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Profile
    },
    {
      path: "/sign-in",
      name: "sign-in",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Вход"
      },
      component: loadView("login-form")
    },
    {
      path: "/reset-password",
      name: "reset-password",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Смена пароля",
        description: "Введите email указанный при регистрации, на него будут отправлены инструкции по восстановлению учетной записи"
      },
      component: loadView("reset-password-form")
    },
    {
      path: "/sign-up",
      name: "sign-up",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Регистрация"
      },
      component: loadView("create-account-form"),
    },
    {
      path: "/change-password/:recoveryCode",
      name: "change-password",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Смена пароля"
      },
      component: loadView("change-password-form")
    },
    {
      path: "/",
      redirect: "/tasks"
    },
    {
      path: "/recovery",
      redirect: "/tasks"
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/tasks"
    }
  ],
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/sign-in', '/sign-up'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/sign-in');
  } else {
    next();
  }
});

export default router;
