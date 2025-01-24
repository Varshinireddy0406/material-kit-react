import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKINVtWkdnuOzPoBu57LlvKNgKt7jaHjE",
  authDomain: "login-auth-df125.firebaseapp.com",
  projectId: "login-auth-df125",
  storageBucket: "login-auth-df125.appspot.com",
  messagingSenderId: "267436082325",
  appId: "1:267436082325:web:8d11609d8b1d51531b479c",
  measurementId: "G-MTDCB31JGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Function to add admin user (for testing purposes)
const addAdminUser = async () => {
  const email = "admin@123.com";
  const password = "admin@123";

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Admin user created:", userCredential.user);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

// Call the function to add admin user (for testing purposes)
addAdminUser();
