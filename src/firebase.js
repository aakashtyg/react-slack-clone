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

export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(googleProvider);
};
