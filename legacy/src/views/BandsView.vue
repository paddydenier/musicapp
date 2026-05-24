<script setup>
import { ref, reactive, onBeforeMount, watchEffect } from "vue";
import { useRoute } from "vue-router";

import SideBar from "@/components/SideBar.vue";
import BandInfo from "@/components/BandInfo.vue";
import UnauthenticatedCreate from "@/components/UnauthenticatedCreate.vue";
import AuthenticatedCreate from "@/components/AuthenticatedCreate.vue";

import { db, auth } from "@/firebase/index.js";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

const currentUserAuthID = ref("");
const user = reactive({});
const authenticated = ref(false);
const name = ref("");

const band = reactive({
  name: String,
  info: String,
  members: [],
});

const route = useRoute();
const searchQuery = ref(route.query.search);
const selected = ref("created");

//basically retrieves current user id
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserAuthID.value = user.uid;
    getUser();
  } else {
    currentUserAuthID.value = "";
  }
});

//get current user
async function getUser() {
  const docRef = doc(db, "users", currentUserAuthID.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    user.value = docSnap.data();
    name.value = user.value.firstName;
    authenticated.value = true;
  } else {
    console.log("No such document!");
  }
}

//Retrieves value from event which will either be to
//display band info or show the create band component
async function buttonClicked(newValue) {
  console.log("HERE")
  if (newValue !== "created") {
    await getBand(newValue);
  } else {
    selected.value = newValue;
  }
}

//Updates the band and the user collection
//User adds new band, band adds new user
async function joinBand(id) {
  const bandRef = doc(db, "bands", id);
  const bandSnapshot = await getDoc(bandRef);
  const currentMembers = bandSnapshot.data().members;

  if (!currentMembers.some((member) => member.userID === user.value.userID)) {
    await updateDoc(bandRef, {
      members: arrayUnion(user.value),
    });
  } else {
    console.log("User already in band");
  }

  const userRef = doc(db, "users", currentUserAuthID.value);

  await updateDoc(userRef, {
    bands: arrayUnion(id),
  });
}

//Gets a band from Firebase with matching id
async function getBand(id) {
  const docRef = doc(db, "bands", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    band.name = docSnap.data().name;
    band.info = docSnap.data().info;
    band.members = docSnap.data().members;
    selected.value = id;
  } else {
    console.log("No such document!");
  }
}

//Fetches new band info when it detects that there is a new search
watchEffect(() => {
  const newSearchQuery = route.query.search;
  if (newSearchQuery !== searchQuery.value) {
    searchQuery.value = newSearchQuery;
    getBand(newSearchQuery);
  }
});

//For when a user searches for a band
onBeforeMount(() => {
  if (searchQuery.value) {
    selected.value = searchQuery.value;
    getBand(selected.value);
  }
});
</script>

<template>
  <div class="layout">
    <SideBar @show="buttonClicked" />
    <div class="body">
      <div v-if="!authenticated && selected === 'created'" class="landing">
        <UnauthenticatedCreate />
      </div>
      <div
        v-else-if="authenticated && selected === 'created'"
        class="bandCards"
      >
        <AuthenticatedCreate :name="name" :user="user"/>
      </div>
      <div v-else class="bandCards">
        <BandInfo
          @joinBand="joinBand"
          :key="band.id"
          :band="band"
          :authenticated="authenticated"
        />
      </div>
    </div>
    <div class="emptybar"></div>
  </div>
</template>

<style>
/* layout splits the page into two parts (sidebar and body) */
.layout {
  display: flex;
  flex-direction: row;
  width: 100%;
}

/* body where band related things are displayed */
.body {
  display: flex;
  width: 70%;
}

/* Unauthenticated landing */
.landing {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* cards to display band info */
.bandCards {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

/* just to add space between icon and text */
.create-icon {
  padding-right: 15px;
}

/* empty bar takes up right side of the screen (instead of a sidebar) 
to make the screen proportional */
.emptybar {
  height: 100vh;
  width: 15%;
  display: flex;
}
</style>
