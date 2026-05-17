<script setup>
import { ref } from "vue";
import { db } from "@/firebase/index.js";

import { collection, doc, setDoc } from "firebase/firestore";

const bandName = ref();
const bandInfo = ref();
const bandMembers = ref([]);
const props = defineProps(["name", "user"]);

//create a new band
async function createBand() {
  const bandsRef = collection(db, "bands");
  bandMembers.value.push(props.user.value);
  await setDoc(doc(bandsRef, bandName.value), {
    name: bandName.value,
    members: bandMembers.value,
    info: bandInfo.value,
  });
  console.log("Added new band");
}
</script>

<template>
  <div class="create-band">
    <h1>Hello {{ name }}</h1>
    <div class="sub-text">
      <font-awesome-icon class="create-icon" :icon="['fas', 'hammer']" />
      Create a new band or join one!
    </div>

    <form @submit.prevent="createBand">
      <div class="input-container">
        <label for="bandName">Band Name:</label>
        <input v-model="bandName" type="text" class="input" required />
      </div>
      <div class="input-container">
        <label for="bandInfo">Band Information:</label>
        <textarea v-model="bandInfo" class="input" rows="4"></textarea>
      </div>

      <div class="form-buttons">
        <button class="bands-buttons reset-button" type="reset" value="Reset">
          Reset
        </button>
        <button class="bands-buttons create-button" type="submit">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.create-band {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.sub-text {
  font-size: x-large;
}

/* form css */
form {
  width: 100%;
}

.input {
  height: 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.form-buttons {
  display: flex;
  justify-content: end;
}

/* buttons to create or reset */
.bands-buttons {
  border-radius: 5px;
  border-width: 1px;
  cursor: pointer;
  width: 20%;
  height: 40px;
  border: 0;
  border-radius: 6px;
  color: white;
}

.reset-button {
  background-color: var(--secondary);
}

.reset-button:hover {
  background-color: burlywood;
}

.create-button {
  background-color: var(--primary);
  margin-left: 2px;
}

.create-button:hover {
  background-color: var(--accent);
}
</style>
