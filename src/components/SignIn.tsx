import React, { useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

interface SignInProps {
  user: any;
  setUser: (user: any) => void;
}

const SignIn: React.FC<SignInProps> = ({ user, setUser }) => {
  useEffect(() => {
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
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
      });
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

  useEffect(() => {
    console.log(user);
  }, [user]);

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
