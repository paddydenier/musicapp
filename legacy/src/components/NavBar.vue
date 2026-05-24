<script setup>
import { RouterLink } from "vue-router";
import SearchBar from "./SearchBar.vue";
import { onBeforeMount } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { auth } from '../firebase';

const store = useStore();
const userID= ref('');

onBeforeMount(() => {
  store.dispatch("fetchUser");
});

onMounted(() => {
  // Add an authentication state observer
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      userID.value = user.uid;
    } else {
      // User is signed out
      userID.value = '';
    }
  });
});
</script>

<template>
  <RouterLink class="logo" to="/"
    ><font-awesome-icon
      class="logo-icon"
      :icon="['fas', 'guitar']"
    />BandCollab</RouterLink
  >
  <SearchBar class="search" />
  <div class="nav-routes">
    <RouterLink class="routerButton" to="/">Bands</RouterLink>
    <RouterLink to="/members">Members</RouterLink>
    <RouterLink v-if="$store.state.user" :to="`/profile/${userID}`"
      >Profile</RouterLink
    >
    <div
      class="logout-button"
      v-if="$store.state.user"
      @click="$store.dispatch('logout')"
    >
      Logout
    </div>
    <RouterLink v-else to="/login">Login</RouterLink>
  </div>
</template>

<style>
.logo {
  font-size: 20px;
  font-weight: bold;
  width: 33%;
  display: flex;
  justify-content: start;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.logo .logo-icon {
  padding-right: 10px;
}

.search {
  display: flex;
  width: 33%;
}

.nav-routes {
  display: flex;
  width: 33%;
  justify-content: end;
}

.nav-routes a {
  text-decoration: none;
  font-size: large;
  margin-left: 15px;
  color: black;
}

.nav-routes a:hover {
  color: var(--primary);
}

.logout-button {
  cursor: pointer;
  font-size: large;
  margin-left: 15px;
}
</style>
