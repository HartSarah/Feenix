import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

//const settings = {timestampsInSnapshots: true};
  //Initialize Firebase from unique credentials

const config = {
    apiKey: "AIzaSyC4XzLP2PjPLcNh_79xzsdOGOQ-A-E6MlU",
    authDomain: "feenix-5b06d.firebaseapp.com",
    databaseURL: "https://feenix-5b06d.firebaseio.com",
    projectId: "feenix-5b06d",
    storageBucket: "feenix-5b06d.appspot.com",
    messagingSenderId: "217434201952"
  };
 
const fire =  firebase.initializeApp(config);

//firebase.firestore().settings(settings);

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export  {fire, facebookProvider};
