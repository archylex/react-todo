// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRYOk1BYP-FxDEgVgY84uaqs5Uk_9N0Uc",
  authDomain: "react-todo-58290.firebaseapp.com",
  databaseURL: "https://react-todo-58290-default-rtdb.firebaseio.com",
  projectId: "react-todo-58290",
  storageBucket: "react-todo-58290.appspot.com",
  messagingSenderId: "293051100668",
  appId: "1:293051100668:web:615426e371675c9e07d679"
};

// Initialize Firebase
const initApp = initializeApp(firebaseConfig);
const storage = getStorage(initApp);
const db = getDatabase(initApp);

//export default storage;
export {db, storage};
