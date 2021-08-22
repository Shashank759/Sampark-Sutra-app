import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyD8nR-Kx4vnLmDzpGOWH3rf2BsL4sWxojU",
    authDomain: "sampark-sutra-d115c.firebaseapp.com",
    projectId: "sampark-sutra-d115c",
    storageBucket: "sampark-sutra-d115c.appspot.com",
    messagingSenderId: "1096054071157",
    appId: "1:1096054071157:web:f6d159805175b1669f3d3c",
    measurementId: "G-7240H37QNS"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { Name, MobileNo, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        Name,
        MobileNo,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
