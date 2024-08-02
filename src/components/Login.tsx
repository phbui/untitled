import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CryptoJS from "crypto-js";
import { Editor_Type } from "../pages/Editor";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const editor = useContext(Editor_Type);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      editor.setLogin(user != null);
    });
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Fetch the user document from Firestore
      const userDoc = doc(db, "users", "admin");
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const hashedPassword = CryptoJS.SHA256(password).toString();

        if (hashedPassword === userData.password) {
          const auth = getAuth();
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          setError("Invalid password");
        }
      } else {
        setError("No such user document!");
      }
    } catch (error) {
      setError("Failed to login");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
