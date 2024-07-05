import React, { useEffect } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

interface SignInProps {
  user: any;
  setUser: (user: any) => void;
}

const SignIn: React.FC<SignInProps> = ({ user, setUser }) => {
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result: ", error);
      });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="auth-buttons">
      {user ? (
        <button onClick={signOutUser}>Sign Out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

export default SignIn;
