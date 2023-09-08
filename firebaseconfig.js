// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyDO5gWgw3O2zEmO3aG3T3_yDXBU0NNQrxc",
  authDomain: "agency-a59f7.firebaseapp.com",
  projectId: "agency-a59f7",
  storageBucket: "agency-a59f7.appspot.com",
  messagingSenderId: "560840563195",
  appId: "1:560840563195:web:95bd8ceb8c7eced182135e",
  measurementId: "G-XSCESDMXF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth(app);

export const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error);
    });
};

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function upload(file, currentUser, randomId) {
  console.log(file , currentUser , randomId)
  const fileRef = ref(storage, `${currentUser}/${randomId + ".png"}`);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  // updateProfile(currentUser, { photoURL })
  return photoURL;
}
