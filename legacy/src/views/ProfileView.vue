<template>
  <main>
    <div class="header-card">
      <h2>{{ userName }}</h2>
      <h4>{{ userProfileEmail }}</h4>
    </div>
    <ul>
      <li v-for="band in currentUser" :key="band.id">
        <h3>Bands:</h3>
        <ul>
          <li v-for="item in band.bands" :key="item">
            <div class="profile-card">
              {{ item }}
              <button
                v-if="isCurrentUserProfile(band.userID)"
                @click="removeBand(band.userID, item)"
                class="remove-button"
              >
                -
              </button>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <ul>
      <li v-for="instrument in currentUser" :key="instrument.id">
        <h3>Instruments:</h3>
        <ul>
          <li v-for="item in instrument.instruments" :key="item">
            <div class="instrument-card">
              {{ item }}
              <button
                v-if="isCurrentUserProfile(instrument.userID)"
                @click="removeInstrument(instrument.userID, item)"
                class="remove-button"
              >
                -
              </button>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Add instruments section -->
    <div v-if="isCurrentUserProfile(userID)">
      <h3>Add an Instrument:</h3>
      <input
        v-model="newInstrument"
        type="text"
        placeholder="Instrument name"
      />
      <button class="add-button" @click="addInstrument">Add</button>
    </div>
  </main>
</template>

<script setup>
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebase/index.js";
import { ref, watchEffect, onUnmounted } from "vue";
import { defineProps, defineEmits } from "vue";
import { auth } from "@/firebase/index.js";
import { emailToName } from "@/helpers/scripts.js";

const props = defineProps(["userID"]);
const emit = defineEmits();

const allUsers = ref([]);
const currentUser = ref();

const userProfileEmail = ref("");
const userName = ref("");

const currentUserAuthID = ref(""); //retrieved by auth
const newInstrument = ref("");

// Get the current user's ID
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserAuthID.value = user.uid;
  } else {
    currentUserAuthID.value = "";
  }
});

//retrieving all the users registered
onSnapshot(collection(db, "users"), (querySnapshot) => {
  allUsers.value = [];
  querySnapshot.forEach((doc) => {
    const userInstruments = doc.data().instruments || [];
    let user = {
      userID: doc.data().userID,
      email: doc.data().email,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      instruments: userInstruments,
      bands: doc.data().bands,
    };
    allUsers.value.push(user);
  });
});

//a check to see if your id matches the id of the profile
//you are going to edit
const isCurrentUserProfile = (profileUserID) => {
  return currentUserAuthID.value === profileUserID;
};

const removeInstrument = async (profileUserID, instrument) => {
  // Check if the profile matches the logged-in user's profile
  const userDoc = allUsers.value.find((user) => user.userID === profileUserID);

  if (userDoc && isCurrentUserProfile(userDoc.userID)) {
    // Remove the instrument from the array
    userDoc.instruments = userDoc.instruments.filter(
      (item) => item !== instrument
    );

    // Update the Firestore document
    const docRef = doc(db, "users", profileUserID);
    await updateDoc(docRef, {
      instruments: arrayRemove(instrument),
    });

    // Emit the instrument name
    emit("instrumentRemoved", instrument);
  }
};

const removeBand = async (profileUserID, band) => {
  const userRef = doc(db, "users", profileUserID);

  await updateDoc(userRef, {
    bands: arrayRemove(band),
  });

  const bandsRef = doc(db, "bands", band);

  const docSnapshot = await getDoc(bandsRef);
  const currentMembers = docSnapshot.data().members;
  const updatedMembers = currentMembers.filter(
    (member) => member.userID !== profileUserID
  );

  await updateDoc(bandsRef, {
    members: updatedMembers,
  });
};

const addInstrument = async () => {
  if (newInstrument.value.trim() !== "") {
    // Find the current user's document in allUsers
    const currentUserDoc = allUsers.value.find(
      (user) => user.userID === currentUserAuthID.value
    );

    if (currentUserDoc) {
      // Update the Firestore document
      const docRef = doc(db, "users", currentUserAuthID.value);
      await updateDoc(docRef, {
        instruments: arrayUnion(newInstrument.value),
      });

      // Clear the input field
      newInstrument.value = "";
    }
  }
};

watchEffect(() => {
  // Update currentUser based on userID
  currentUser.value = allUsers.value.filter(
    (user) => user.userID === props.userID
  );

  // Check if there is a user in the array
  if (currentUser.value.length > 0) {
    userProfileEmail.value = currentUser.value[0].email;
    userName.value =
      currentUser.value[0].firstName + " " + currentUser.value[0].lastName;
  }
});
</script>

<style>
main {
  max-width: 600px;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  position: relative; /* Added for positioning */
}

.header-card {
  width: 100%;
  padding-left: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
}

.profile-card {
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
}

.instrument-card {
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
}

.remove-button {
  background-color: red; /* Tomato color */
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #d2361e; /* Slightly darker shade on hover */
}

.add-button {
  border-radius: 8px;
  border-width: 1px;
  cursor: pointer;
  display: inline;
  padding: 10px;
  border: 0;
  background-color: var(--primary);
  color: white;
}

.remove-button {
  position: absolute; /* Positioned relative to the parent li */
  right: 0; /* Fixed position at the right edge of the parent li */
}

input {
  padding: 8px;
  margin-right: 8px;
}

/* Add some spacing between elements */
main > * {
  margin-bottom: 16px;
}
</style>
@/helpers/emailFormat.js
