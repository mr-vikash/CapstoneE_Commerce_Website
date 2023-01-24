import {initializeApp} from 'firebase/app';
import 
    {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
import { useEffect } from 'react';
import {getRedirectResult} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAsbzDSt5PPKZcRreiBtQqNCwnYWz8xW_I",
  authDomain: "crown-clothing-db-f0397.firebaseapp.com",
  projectId: "crown-clothing-db-f0397",
  storageBucket: "crown-clothing-db-f0397.appspot.com",
  messagingSenderId: "529983816759",
  appId: "1:529983816759:web:06a60a1f63b17a74536bb2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = ()=> signInWithPopup(auth,googleProvider);

export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,additionalInformation={}) =>
{

  if(!userAuth)
  {
    return;
  }
  const userDocRef = doc(db,'users',userAuth.uid);
  console.log(userDocRef);

const userSnapShot = await getDoc(userDocRef);

console.log(userSnapShot);
console.log(userSnapShot.exists());

//if user snapshot does not exist
if(!userSnapShot.exists())
{
 const {displayName,email} = userAuth;
 const createdAt = new Date();

 try{
   await setDoc(userDocRef,{
    displayName,
    email,
    createdAt,
    ...additionalInformation,
  });
 }
 catch(error){
  console.log('error creating the user',error.message);

 }
}
return userDocRef;

};


export const createAuthUserWithEmailAndPassword = async(email,password)=>
{
  if(!email|| !password)
  {
    return;
  }
  return await createUserWithEmailAndPassword(auth,email,password)
}

export const SignInAuthUserWithEmailAndPassword = async(email,password)=>
{
  if(!email|| !password)
  {
    return;
  }
  return await signInWithEmailAndPassword(auth,email,password)
}
