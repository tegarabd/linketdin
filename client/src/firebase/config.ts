// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcsL4NKj8oqyGP7tXQKVSEGLW1tkMWCSQ",
  authDomain: "linketdin-360309.firebaseapp.com",
  projectId: "linketdin-360309",
  storageBucket: "linketdin-360309.appspot.com",
  messagingSenderId: "62658968581",
  appId: "1:62658968581:web:55110304756c244c02306c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
