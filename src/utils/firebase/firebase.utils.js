import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLrq2rohB93-mzL0g4po5NZynuo9XPmsc",
  authDomain: "crown-app-5311d.firebaseapp.com",
  projectId: "crown-app-5311d",
  storageBucket: "crown-app-5311d.appspot.com",
  messagingSenderId: "149830668185",
  appId: "1:149830668185:web:488f768bb19127cd194d08",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef)
  const userSnapShot = await getDoc(userDocRef);
  //   console.log(userSnapShot.exists());
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) =>{
    const collectionRef = collection(db,collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((object)=> {
      const docRef = doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef,object)
    })

    await batch.commit()
    console.log('done')
}
export const getCategoriesAndDocuments = async() =>{

  const collectionRef = collection(db,'category')
  const q = query(collectionRef)
  const querySnapShot = await getDocs(q)
  const categoryMap = querySnapShot.docs.reduce((acc,docSnapShot) =>{
    const {title,items} = docSnapShot.data()
    acc[title.toLowerCase()] = items
    return acc
  },{})
  return categoryMap
}