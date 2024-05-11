// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"
import {getFirestore,setDoc,doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfNmUHFD7Eq1uVSufWHNYAP96pyha-tvE",
  authDomain: "elevate-b2cd2.firebaseapp.com",
  projectId: "elevate-b2cd2",
  storageBucket: "elevate-b2cd2.appspot.com",
  messagingSenderId: "530231746992",
  appId: "1:530231746992:web:678d3b92b552d5f7097675"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();




// submit button 
const submit = document.getElementById("submitlog"); 

submit.addEventListener("click",function(event){ 
  event.preventDefault() 
  //input email & password 
  const email = document.getElementById("emaillog").value;
  const password = document.getElementById("passwordlog").value; 
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Logging in ...")
    window.location.href = "home-signed.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });  
  
})