import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAIRwsM1UECcHZ_NoIFmKeJR7NA3dgy6w4',
  authDomain: 'react-slack-clone-ad3ff.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-ad3ff.firebaseio.com',
  projectId: 'react-slack-clone-ad3ff',
  storageBucket: 'react-slack-clone-ad3ff.appspot.com',
  messagingSenderId: '15491098266',
  appId: '1:15491098266:web:e0eef408af68dbdd21a123',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
  // Initialize google provider
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  // Ask user to select gmail account in a new popup window
  auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  auth.signOut();
};

export const createOrGetUserProfileDocument = async (user) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    try {
      const user = {
        display_name: displayName,
        email,
        photo_url: photoURL,
        created_at: new Date(),
      };
      await userRef.set(user);
    } catch (error) {
      console.log('Error', error);
    }
  }

  return getUserDocument(user.uid);
};

async function getUserDocument(uid) {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('user').doc(uid);
    return userDocument;
  } catch (error) {
    console.error('Error in getUserDocument', error.message);
  }
}
