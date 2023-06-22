
import { useState } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils.js";




const SignIn = () => {

  
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
 
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In With Google</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google</button> */}
      <SignUpForm/>
    </div>
  );
};

export default SignIn;

/* 
Google Sign In with Redirect
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase.utils.js";
  useEffect( () => {
    const fetchAuthData = async()=>{
      const response = await getRedirectResult(auth);
      if(response){
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
      }
    }
    fetchAuthData();
    
  }, []);
 const logGoogleUserWithRedirect = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
    // const userDocRef = await createUserDocumentFromAuth(user)
  }; */