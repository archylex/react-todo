// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQy4ULOWADF5vnvzJJbR3leJdZosaftZQ",
  authDomain: "womantodo-abd22.firebaseapp.com",
  projectId: "womantodo-abd22",
  storageBucket: "womantodo-abd22.appspot.com",
  messagingSenderId: "92710924364",
  appId: "1:92710924364:web:44dff09cabf2ecad40c4e9",
  measurementId: "G-8DDM7ME0DZ"
};

// Initialize Firebase
const initApp = initializeApp(firebaseConfig);
const storage = getStorage(initApp);
export default storage;
