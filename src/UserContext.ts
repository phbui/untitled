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
    let data: any = {};

    if (!user) {
      data = await promptLogin();
    } else {
      data = user;
    }

    const userDoc = await getDoc(doc(db, "users", data.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
  };

  const loadGameData = async () => {
    if (!user) {
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data().savedata;
    }
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

  const promptLogin = async () => {
    const provider = new GoogleAuthProvider();

    let signin = await signInWithPopup(auth, provider);

    setUser(signin.user);
    return signin.user;
  };

  return {
    character,
    setCharacter,
    saveGame,
    loadUserData,
    loadGameData,
    user,
    promptLogin,
  };
};

export default UserContext;
