import { useState, useEffect, SetStateAction } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { Character } from "./components/Creation";
import { auth, db } from "./firebaseConfig";

const UserContext = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadCharacterData(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async () => {
    if (!user) {
      promptLogin();
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }

    return {
      currentChapterId: "day_one",
      currentSceneId: "start",
      currentDialogueId: "start",
    };
  };

  const loadCharacterData = async (userId: string) => {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setCharacter(userData.savedata.player_character);
    }
  };

  const saveGame = async (
    currentChapterId: string,
    currentSceneId: string,
    currentDialogueId: string
  ) => {
    if (!user) {
      promptLogin();
      return;
    }

    const saveData = {
      currentChapterId,
      currentSceneId,
      currentDialogueId,
      player_character: character,
    };

    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        savedata: saveData,
      },
      { merge: true }
    );
  };

  const promptLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return {
    character,
    setCharacter,
    saveGame,
    loadUserData,
    user,
    promptLogin,
  };
};

export default UserContext;
