import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxktZ44VhLWqhrU25j_S1n5z1urmMos8A",
  authDomain: "traveldiary-ef630.firebaseapp.com",
  projectId: "traveldiary-ef630",
  storageBucket: "traveldiary-ef630.appspot.com",
  messagingSenderId: "939906790678",
  appId: "1:939906790678:web:ff68e646960e5cbe4e0c37",
  measurementId: "G-LGHMWWBLXC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Set the authentication persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });

export { auth, googleProvider };