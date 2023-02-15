import {initializeApp} from 'firebase/app';
import 
    {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs, DocumentSnapshot} from 'firebase/firestore'
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

//storing and getting data from firestore database
export const addCollectionAndDocuments = async (CollectionKey,objectsToAdd) =>
{
   const collectionRef = collection(db,CollectionKey);
   const batch = writeBatch(db);

   objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object)
   });

   await batch.commit();
   console.log('done');
};


export const getCategoriesAndDocuments = async ()=>
{
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const {title,items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{});
  return categoryMap;
}



export const createUserDocumentFromAuth = async(userAuth,additionalInformation={}) =>
{

  if(!userAuth)
  {
    return;
  }
  const userDocRef = doc(db,'users',userAuth.uid);


const userSnapShot = await getDoc(userDocRef);


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

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);
