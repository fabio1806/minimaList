<!-- Initialize firebase database -->
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDKlBPiDWwao1vvkhPhg75S0eU6bPXEUOk",
    authDomain: "todo-list-2e30e.firebaseapp.com",
    databaseURL: "https://todo-list-2e30e.firebaseio.com",
    projectId: "todo-list-2e30e",
    storageBucket: "todo-list-2e30e.appspot.com",
    messagingSenderId: "719892832012",
    appId: "1:719892832012:web:96566b3ae72129bcc7b329",
    measurementId: "G-7S0QX0Z5V0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();
