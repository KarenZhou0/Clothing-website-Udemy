import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDI7Kxhy4-ATOPIMmGf4cmfVfurLcxa15Y",
    authDomain: "crwn-db-a1857.firebaseapp.com",
    databaseURL: "https://crwn-db-a1857.firebaseio.com",
    projectId: "crwn-db-a1857",
    storageBucket: "crwn-db-a1857.appspot.com",
    messagingSenderId: "417595591232",
    appId: "1:417595591232:web:99d566bfe5de6797052da5",
    measurementId: "G-M552XNX8K6"
};

export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if (!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;