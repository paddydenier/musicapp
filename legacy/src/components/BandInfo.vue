<script setup>
import router from "@/router/index.js";

const props = defineProps(["band", "authenticated"]);
console.log(props.band.members);

async function redirectToProfile(id) {
  console.log("Redirecting");
  router.push({
    name: "profile",
    params: { userID: id },
  });
}
</script>

<template>
  <div class="band-info-card">
    <div class="band-header">
      <h2 class="band-info-name">{{ props.band.name }}</h2>
      <div
        v-if="props.authenticated"
        @click="$emit('joinBand', props.band.name)"
        class="join-button"
      >
        Join
      </div>
    </div>
    <div class="band-info">
      <h3>Band Information</h3>
      <p>
        {{ props.band.info }}
      </p>
    </div>
    <div class="band-members">
      <h3>Band Members</h3>
      <ul>
        <li
          v-for="member in props.band.members"
          :key="member.id"
          class="member"
          @click="redirectToProfile(member.userID)"
        >
          {{ member.firstName }} {{ member.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.band-info-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
}

.band-header {
  background-color: var(--primary);
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.band-info-name {
  margin: 0;
}

.member {
  display: inline-block;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
  margin-right: 2px;
}

.member:hover {
  background-color: var(--accent);
}

.join-button {
  margin: 0;
  font-size: medium;
  cursor: pointer;
  height: 25px;
  width: 8%;
  border: 1px;
  border-style: solid;
  border-radius: 6px;
  border-width: 2px;
  background-color: var(--primary);
}

.join-button:hover {
  background-color: var(--accent);
}

.band-info {
  padding: 20px;
}

.band-members {
  padding: 20px;
}

.band-members h3 {
  margin-top: 0;
}

.band-members ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.band-members li {
  margin-bottom: 5px;
}
</style>
