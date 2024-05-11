import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBfNmUHFD7Eq1uVSufWHNYAP96pyha-tvE",
    authDomain: "elevate-b2cd2.firebaseapp.com",
    projectId: "elevate-b2cd2",
    storageBucket: "elevate-b2cd2.appspot.com",
    messagingSenderId: "530231746992",
    appId: "1:530231746992:web:678d3b92b552d5f7097675"
  };
 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();
  
  const submit = document.getElementById("submit");
  
  submit.addEventListener("click", function(event){ 
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value; 
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return; 
    }
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      sendEmailVerification(auth.currentUser).then(function() {
        alert("A verification email has been sent to your email address. Please verify your email before continuing.");
  
        auth.onAuthStateChanged((user) => {
          if (user) {
            user.reload().then(() => {
              if (user.emailVerified) {
                setDoc(doc(db, "users", user.uid), {
                  name: name,
                  email: email,
                })
                .then(() => {
                  console.log("User data successfully added to Firestore");
                  alert("Your email has been verified successfully.");
                  window.location.href = "home-signed.html";
                })
                .catch((error) => {
                  console.error("Error adding user data to Firestore: ", error);
                });
              } else {
                alert("Your email is not verified. Please verify your email before continuing.");
              }
            });
          } else {
            alert("User is not signed in.");
          }
        });
  
      }).catch(function(error) {
        console.error('Email verification error:', error);
      });
  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  });



