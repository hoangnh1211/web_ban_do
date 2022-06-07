// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

import  firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCboZILNUkkerQOrBS2NIjmJjYDKOj_BQA",
  authDomain: "jlpt-80382.firebaseapp.com",
  projectId: "jlpt-80382",
  storageBucket: "jlpt-80382.appspot.com",
  messagingSenderId: "685081153665",
  appId: "1:685081153665:web:6dcd6c237d73265a857d80"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
const db = firebase.firestore();
export default firebase;
export const getFirebaseItems = async () => {
    try {
      const data = await db.collection("todo").get();
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return items;
    } catch (err) {
      return [];
    }
  }
  export const addFirebaseItem = async (item,file) => {
    try {
      const data = db.collection("todo");
      await data.add(item);
     
    var storageRef = firebase.storage().ref();
    var mountainImagesRef = storageRef.child(`files/${file.name}`);
    mountainImagesRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    } catch (err) {
    }
  }
  export const download = async (url) => {
    try {
      var storageRef = firebase.storage().ref();
      //var pathReference = storage.ref(`files/${url}`);  
      storageRef.child(`files/${url}`).getDownloadURL()
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
          window.open(url, '_blank');
        // This can be downloaded directly:
      })
    } catch (err) {
    }
  }
  export const updateFirebaseItem = async (item, file) => {
    try {
      const data = db.collection("todo").doc(item.id);
      await data.update(item);
      var storageRef = firebase.storage().ref();
    var mountainImagesRef = storageRef.child(`files/${file.name}`);
    mountainImagesRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    } catch (err) {
    }
  }
  
  export const clearFirebaseItem = async (item) => {
    const data = db.collection("todo").doc(item.id);
    await data.delete()
  };
