import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBSEHD78ZE9u9_-v8BKwut7sgxvDVnH1OM",
  authDomain: "trado-b0e78.firebaseapp.com",
  projectId: "trado-b0e78",
  storageBucket: "trado-b0e78.appspot.com",
  messagingSenderId: "126285584509",
  appId: "1:126285584509:web:6e610bb362caa6f8227914"
};
  // Initialize Firebase
  if(!firebase.apps.length){ 
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase.firestore();