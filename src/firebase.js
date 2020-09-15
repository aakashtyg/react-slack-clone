import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1AOI-TzBw_0xF5vZpJ4QbTTfL_LJNeAA',
  authDomain: 'slacky-d1604.firebaseapp.com',
  databaseURL: 'https://slacky-d1604.firebaseio.com',
  projectId: 'slacky-d1604',
  storageBucket: 'slacky-d1604.appspot.com',
  messagingSenderId: '198405935145',
  appId: '1:198405935145:web:d9b9129b65a17947e08c38',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth stuff
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  auth.signOut();
};

// Firestore stuff
export const firestore = firebase.firestore();
window.firestore = firestore;

export const createOrGetUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // check if a the user doc is there in DB with
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  // if no user exists in DB @ path 'userRef' then go and make one
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    const createdAt = new Date();

    try {
      await userRef.set({
        display_name: displayName || additionalData.displayName,
        email,
        photo_url: photoURL
          ? photoURL
          : 'https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72',
        created_at: createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid);
    return userDocument;
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};
