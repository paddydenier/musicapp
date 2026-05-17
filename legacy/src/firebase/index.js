import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDBiiGQt2-NIOQeGM_FL8X4deHUGrpDnCI",
  authDomain: "musicapp-5a4aa.firebaseapp.com",
  projectId: "musicapp-5a4aa",
  storageBucket: "musicapp-5a4aa.appspot.com",
  messagingSenderId: "881607677827",
  appId: "1:881607677827:web:b5e27bbaac5ee686b0c8b6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };