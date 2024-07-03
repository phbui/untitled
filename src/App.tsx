import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db, auth, provider } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import DressUpCharacter from "./components/DressUpCharacter";
import DressUpWardrobe, {
  Interface_Wardrobe_Item,
} from "./components/DressUpWardrobe";
import CharacterCatalog from "./components/CharacterCatalog";

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: Interface_Wardrobe_Item;
  }>({
    hat: {} as Interface_Wardrobe_Item,
    accessories: {} as Interface_Wardrobe_Item,
    shirt: {} as Interface_Wardrobe_Item,
    jacket: {} as Interface_Wardrobe_Item,
    pants: {} as Interface_Wardrobe_Item,
    shoes: {} as Interface_Wardrobe_Item,
  });

  const [catalog, setCatalog] = useState<
    { id: string; items: { [key: string]: Interface_Wardrobe_Item } }[]
  >([]);
  const [user, setUser] = useState<any>(null);

  const handleDrop = (type: string, item: Interface_Wardrobe_Item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [type]: item,
    }));
  };

  const saveCharacter = async () => {
    if (!user) {
      console.error("User not authenticated");
      alert("Please sign in to save your character.");
      signInWithGoogle();
      return;
    }
    try {
      const newCharacter = { items: selectedItems, userId: user.uid };
      const docRef = await addDoc(collection(db, "characters"), newCharacter);
      setCatalog([...catalog, { id: docRef.id, items: selectedItems }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const loadCatalog = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "characters"));
      const loadedCatalog = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        items: doc.data().items as { [key: string]: Interface_Wardrobe_Item },
      }));
      setCatalog(loadedCatalog);
    } catch (e) {
      console.error("Error loading documents: ", e);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <div className="App">
      <div className="auth-buttons">
        {user ? (
          <button onClick={signOutUser}>Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        )}
      </div>
      <DressUpWardrobe onDrop={handleDrop} />
      <DressUpCharacter clothingItems={selectedItems} onDrop={handleDrop} />
      <button onClick={saveCharacter}>Save Character</button>
      <CharacterCatalog catalog={catalog} />
    </div>
  );
};

export default App;
