import { firebase } from '@firebase/app'
import 'firebase/firestore' 
const firebaseConfig = {
    apiKey: "AIzaSyDf23Hulrdxpw6zZGS9FekTPY7pcZD-7dI",
    authDomain: "madad-22e60.firebaseapp.com",
    projectId: "madad-22e60",
    storageBucket: "madad-22e60.appspot.com",
    messagingSenderId: "589837038052",
    appId: "1:589837038052:web:9cb1f0a40f1558c21a97f1",
    measurementId: "G-R2Y0REXDRE"
   };
// Initialize Firebase

 firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db ;

