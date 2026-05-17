<script setup>
import router from "@/router/index.js";

async function loginRedirect() {
  router.push("/login");
}
</script>

<template>
  <div class="unauth-create-band">
    <h1>Hello!</h1>
    <div>
      <font-awesome-icon class="create-icon" :icon="['fas', 'hammer']" />
      Create a new band or join one!
    </div>
    <button @click="loginRedirect" class="cta-button">Login to start</button>
  </div>
</template>

<style>
.unauth-create-band {
  display: flex;
  flex-direction: column;
  font-size: x-large;
}

/* call to action */
.cta-button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--primary);
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #d89868;
}
</style>
