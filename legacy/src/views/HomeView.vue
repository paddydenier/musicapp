<template>
  <h1>Home {{ userEmail }}</h1>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { auth } from "../firebase";

const userEmail = ref("");

onMounted(() => {
  // Add an authentication state observer
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      userEmail.value = user.email;
    } else {
      // User is signed out
      userEmail.value = "";
    }
  });
});
</script>
