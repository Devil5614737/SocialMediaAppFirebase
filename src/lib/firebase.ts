import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz4bvGOmiwFfSjC4ON1ItLu304J8koXMM",
  authDomain: "social-media-788f1.firebaseapp.com",
  projectId: "social-media-788f1",
  storageBucket: "social-media-788f1.appspot.com",
  messagingSenderId: "851348890844",
  appId: "1:851348890844:web:6f33df3de2c668fe25c019"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();