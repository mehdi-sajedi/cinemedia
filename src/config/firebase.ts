// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCVhmX30071xh1HYat7KGNvwB_PY75VAGc',
  authDomain: 'movies-and-shows-4d83f.firebaseapp.com',
  projectId: 'movies-and-shows-4d83f',
  storageBucket: 'movies-and-shows-4d83f.appspot.com',
  messagingSenderId: '502828758924',
  appId: '1:502828758924:web:ff3777bce56de5d108c8a9',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

export { auth, db };
