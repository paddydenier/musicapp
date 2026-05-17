<template>
  <div class="members-header">
    <h3>All Members</h3>
    <div>
      <label for="nameSort">Name:</label>
      <select id="nameSort" v-model="nameSort" @change="sortUsers">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <div>
      <label for="instrumentFilter">Instrument:</label>
      <select
        id="instrumentFilter"
        v-model="instrumentFilter"
        @change="filterUsers"
      >
        <option value="">All Instruments</option>
        <option
          v-for="instrument in sortedInstruments"
          :key="instrument"
          :value="instrument"
        >
          {{ instrument }}
        </option>
      </select>
    </div>
  </div>

  <div class="member-tiles">
    <router-link
      v-for="user in displayedUsers"
      :key="user.userID"
      :to="{ name: 'profile', params: { userID: user.userID } }"
      class="member-tile"
    >
      <h4>{{ user.firstName + " " + user.lastName }}</h4>
      <ul v-if="user.instruments.length > 0">
        <li v-for="instrument in user.instruments.sort()" :key="instrument">
          {{ instrument }}
        </li>
      </ul>
      <p v-else>No instruments</p>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase/index.js";

const allUsers = ref([]);
const displayedUsers = ref([]);
const allInstruments = ref([]);
const sortedInstruments = ref([]);
let nameSort = ref("asc"); // Default sorting is ascending
let instrumentFilter = ref("");

onSnapshot(collection(db, "users"), (querySnapshot) => {
  allUsers.value = [];
  allInstruments.value = [];

  querySnapshot.forEach((doc) => {
    const userInstruments = doc.data().instruments || [];
    const user = {
      userID: doc.data().userID,
      email: doc.data().email,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      instruments: userInstruments,
    };
    allUsers.value.push(user);

    //collect unique instruments
    allInstruments.value = [
      ...new Set([...allInstruments.value, ...userInstruments]),
    ];
  });

  //ascneding lexicographically
  sortedInstruments.value = allInstruments.value.sort();

  sortUsers();
  filterUsers();
});

const sortUsers = () => {
  displayedUsers.value = [...displayedUsers.value];

  //sort members by name
  displayedUsers.value.sort((a, b) => {
    const nameA = a.firstName + " " + a.lastName;
    const nameB = b.firstName + " " + b.lastName;

    if (nameSort.value === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
};

const filterUsers = () => {
  //apply instrument filter first
  if (instrumentFilter.value) {
    displayedUsers.value = allUsers.value.filter((user) =>
      user.instruments.includes(instrumentFilter.value)
    );
  } else {
    displayedUsers.value = [...allUsers.value];
  }

  //then apply name sorting
  sortUsers();
};
</script>

<style scoped>
.members-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
}

.member-tiles {
  display: flex;
  flex-wrap: wrap;
}

.member-tile {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 5px;
  margin-right: 5px;
  width: 180px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  text-align: center;
  background-color: var(--secondary);
  border-radius: 10px;
}

.member-tile:hover {
  background-color: var(--accent);
}

.member-name {
  font-size: 18px; /* Adjust font size if needed */
  margin-bottom: 8px; /* Add space between name and instruments */
}
</style>
