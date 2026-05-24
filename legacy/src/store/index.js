import { createStore } from 'vuex';
import router from '../router';
import { auth, db } from '../firebase'; // Import auth and db from your firebase module
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, details) {
        const { email, password } = details;
      
        try {
          // Sign in user using Firebase Authentication
          await signInWithEmailAndPassword(auth, email, password);
      
          // Get the current user
          const currentUser = auth.currentUser;
      
          if (currentUser) {
            // Dispatch a mutation or commit to update the state or handle other logic
            commit('SET_USER', { userID: currentUser.uid, email: currentUser.email });
      
            // Additional logic or actions can be added here
      
            // Redirect to home page after successful login
            router.push('/');
          }
        } catch (error) {
          // Handle login errors
          switch (error.code) {
            case 'auth/user-not-found':
              alert("User not found. Please check your email or register for a new account.");
              break;
            case 'auth/wrong-password':
              alert("Incorrect password. Please check your password and try again.");
              break;
            case 'auth/invalid-email':
              alert("Invalid email address. Please provide a valid email.");
              break;
            default:
              alert("An error occurred during login. Please try again later.");
          }
      
          console.error('Login error:', error.message);
          throw error; // Rethrow the error to be caught by the calling code
        }
      },
      
      async register({ commit }, userDetails) {
        const { email, password, firstName, lastName } = userDetails;
    
        try {
          // 1. Create user in Firebase Authentication
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
          // 2. Create a user document in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            userID: user.uid,
            email: email,
            firstName: firstName, // Add first name to Firestore
            lastName: lastName,   // Add last name to Firestore
            // You can add other fields as needed
          });
    
          // 3. Dispatch a mutation or commit to update the state or handle other logic
          commit('SET_USER', { userID: user.uid, email, firstName, lastName });
    
          // Additional logic or actions can be added here
    
          // 4. Return the user data or any other information you may need
          return user;
        } catch (error) {
          // Handle registration errors
          console.error('Registration error:', error.message);
          throw error; // Rethrow the error to be caught by the calling code
        }
      },
        async logout ({commit}) {
            await signOut(auth)

      commit("CLEAR_USER");

      router.push("/login");
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});
