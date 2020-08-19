import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'ordero-9e47f.firebaseapp.com',
  databaseURL: 'https://ordero-9e47f.firebaseio.com',
  projectId: 'ordero-9e47f',
  storageBucket: 'ordero-9e47f.appspot.com',
  messagingSenderId: '469538064496',
  appId: '1:469538064496:web:10601d818e270fe62e0cb5',
  measurementId: 'G-ZV1BKKELMV',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
