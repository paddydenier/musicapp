<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/index.js";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

const bands = ref([]);

async function getBands() {
  const querySnapshot = await getDocs(collection(db, "bands"));
  querySnapshot.forEach((doc) => {
    const band = {
      id: doc.id,
      name: doc.data().name,
      members: doc.data().members,
    };
    bands.value.push(band);
  });
}

onMounted(async () => {
  console.log("Connecting to Firebase");
  await getBands();
});
</script>

<template>
  <div class="sidebar">
    <div class="side-title">BANDS</div>
    <div @click="$emit('show', 'created')" class="band-card">
      <h2 class="band-name"><font-awesome-icon class="band-icon" :icon="['fas', 'plus']" />Create</h2>
    </div>
    <div @click="$emit('show', band.id)" v-for="band in bands" :key="band.id" class="band-card">
      <h2 class="band-name">
        <font-awesome-icon class="band-icon" :icon="['fas', 'drum']" />
        {{ band.name }}
      </h2>
    </div>
  </div>
</template>

<style>
.sidebar {
  height: 100vh;
  width: 15%;
  display: flex;
  flex-direction: column;
  border-top-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 1px;
  border-style: solid;
  border-color: gray;
}

.side-title {
  font-size: 13px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.band-name {
  display: flex;
  padding-left: 20px;
  padding-right: 5px;
  font-size: 15px;
}

.band-icon {
  margin-right:5px;
}

.band-card {
  cursor: pointer;
  margin-bottom: 1px;
}

.sidebar .band-card:hover {
  border-width: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: gray;
  background-color: var(--secondary);
}
</style>
