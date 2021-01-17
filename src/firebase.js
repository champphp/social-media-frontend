import firebase from 'firebase'
import data from './APIKey'

const firebaseConfig = {
  apiKey: data.apiKey,
  authDomain: data.authDomain,
  projectId: data.projectId,
  storageBucket: data.storageBucket,
  messagingSenderId: data.messagingSenderId,
  appId: data.appId
};

const firebaseApp = firebase.initializeApp(firebaseConfig)