<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <nav>
      <NavBar />
    </nav>
  </header>
  <body>
    <RouterView />
  </body>
</template>

<style scoped>
nav {
  font-size: 12px;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 10px;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color:gray;
}

body {
  margin-left: 200px;
  margin-right: 200px;
}
</style>
