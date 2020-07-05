const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyCnK4ClGsb2vn4An-JBSrFUrfQ0j49nR_c',
    authDomain: 'resume-mp1-ccapdev.firebaseapp.com',
    projectId: 'resume-mp1-ccapdev'
  });
  
  var db = firebase.firestore();

  