import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'

import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import ProfileView from '../views/ProfileView.vue'
import MembersView from '../views/MembersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bands',
      component: () => import("@/views/BandsView.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/members',
      name: 'members',
      component: MembersView
    },
    {
      path: '/profile/:userID',
      name: 'profile',
      component: ProfileView,
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    // {
    //   path: '/bands',
    //   name: 'bands',
    //   component: () => import("@/views/BandsView.vue")
    // }
  ]
})

router.beforeEach((to, from, next) => {
  //if on /login and authenticated redirect to home
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return
  }

  next();
})

export default router
