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
  }, [editor]);

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
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
