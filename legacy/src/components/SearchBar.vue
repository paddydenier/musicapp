<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/index.js";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  or,
  getDocs,
} from "firebase/firestore";
import router from "@/router/index.js";

const search = ref();
const band = ref();

async function getBand() {
  const bandRef = doc(db, "bands", search.value);
  const docSnap = await getDoc(bandRef);

  if (docSnap.exists()) {
    band.value = docSnap.data();
    console.log("Document data:", docSnap.data());
    router.push({ name: "bands", query: { search: search.value } });
  } else {
    console.log("No matching band!");
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      or(
        where("firstName", "==", search.value),
        where("lastName", "==", search.value)
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      router.push({
        name: "profile",
        params: { userID: userData.userID },
      });
    });
  }
  search.value = "";
}
</script>

<template>
  <input
    v-model="search"
    @keyup.enter="getBand"
    class="search-bar"
    placeholder="Search for members(first name) or bands"
  />
</template>

<style>
.search-bar {
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #d1d5db;
  width: 100%;
  height: 40px;
  font-size: 14px;
}
</style>
