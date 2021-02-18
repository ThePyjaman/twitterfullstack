import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";
import PictureTweet from "./Components/PictureTweet";
import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDeuuq-KqAVV9g7M4yIV4d3KoKTn-fGIKY",
  authDomain: "twitterfullstack.firebaseapp.com",
  projectId: "twitterfullstack",
  storageBucket: "twitterfullstack.appspot.com",
  messagingSenderId: "150963900804",
  appId: "1:150963900804:web:562aec88d313938b4b0dd1",
  measurementId: "G-7LX6JX5SZB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getTweetDocument = async () => {
  let output = await firestore.collection("tweets").get()

      .catch((error) => {
        console.log("Error fetching tweets : ", error)
      });
  console.log(output)
  return output
};

export const getUsername = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();

      return {
        ...userDocument.data().displayName
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
};

export const generateTweetDocument = async (content, image, user) => {
  if (!user) return;

    try {
      await firestore.collection('tweets').add({
        content : content,
        image : image,
        author: user,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
}

