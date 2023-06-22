
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import "./authentication.styles.scss";
const Authentication = () => {

  return (
    <div className="authentication-container">
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default Authentication;

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