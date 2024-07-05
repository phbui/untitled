import React, { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth, provider } from "./firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import DressUpCharacter from "./components/DressUpCharacter";
import BottomTabs from "./components/BottomTabs";
import { Interface_Wardrobe_Item } from "./components/BottomTabs";

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

  const [characterName, setCharacterName] = useState<string>("");
  const [catalog, setCatalog] = useState<
    {
      id: string;
      name: string;
      items: { [key: string]: Interface_Wardrobe_Item };
      likes: number;
      createdAt: number;
    }[]
  >([]);
  const [user, setUser] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "mostLiked" | "leastLiked"
  >("newest");
  const [currentlyDragging, setCurrentlyDragging] =
    useState<Interface_Wardrobe_Item>();

  const handleDrag = (item: Interface_Wardrobe_Item) => {
    setCurrentlyDragging(item);
  };

  const handleDrop = (type: string, item: Interface_Wardrobe_Item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [type]: item,
    }));
    setCurrentlyDragging(undefined);
  };

  const saveCharacter = async () => {
    if (!user) {
      console.error("User not authenticated");
      alert("Please sign in to save your character.");
      signInWithGoogle();
      return;
    }
    if (!characterName) {
      alert("Please enter a name for your character.");
      return;
    }
    try {
      const newCharacter = {
        name: characterName,
        items: selectedItems,
        userId: user.uid,
        likes: 0,
        createdAt: Date.now(),
      };
      console.log("Attempting to add document...");
      const docRef = await addDoc(collection(db, "characters"), newCharacter);
      console.log("Document written with ID: ", docRef.id);
      setCatalog([
        ...catalog,
        {
          id: docRef.id,
          name: characterName,
          items: selectedItems,
          likes: 0,
          createdAt: newCharacter.createdAt,
        },
      ]);
      setCharacterName(""); // Clear the input field after saving
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const loadCatalog = async () => {
    try {
      console.log("Attempting to load documents...");
      const querySnapshot = await getDocs(collection(db, "characters"));
      const loadedCatalog = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name as string,
        items: doc.data().items as { [key: string]: Interface_Wardrobe_Item },
        likes: doc.data().likes as number,
        createdAt: doc.data().createdAt as number,
      }));
      console.log("Loaded catalog: ", loadedCatalog);
      setCatalog(loadedCatalog);
      if (loadedCatalog.length > 0) {
        setSelectedItems(
          loadedCatalog.reduce((oldest, current) =>
            oldest.createdAt < current.createdAt ? oldest : current
          ).items
        );
      }
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

  const likeCharacter = async (characterId: string) => {
    if (!user) {
      console.error("User not authenticated");
      alert("Please sign in to like a character.");
      signInWithGoogle();
      return;
    }
    try {
      const characterDoc = doc(db, "characters", characterId);
      await updateDoc(characterDoc, { likes: increment(1) });
      setCatalog(
        catalog.map((char) =>
          char.id === characterId ? { ...char, likes: char.likes + 1 } : char
        )
      );
    } catch (e) {
      console.error("Error liking character: ", e);
    }
  };

  const warnUserOnUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue =
      "You have unsaved changes, are you sure you want to leave?";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", warnUserOnUnload);
    return () => {
      window.removeEventListener("beforeunload", warnUserOnUnload);
    };
  }, []);

  return (
    <div className="App">
      <div className="auth-buttons">
        {user ? (
          <button onClick={signOutUser}>Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        )}
      </div>
      <input
        type="text"
        placeholder="Enter character name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <BottomTabs
        startDrag={handleDrag}
        onDrop={handleDrop}
        catalog={catalog}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onLike={likeCharacter}
      />
      <DressUpCharacter
        clothingItems={selectedItems}
        currentlyDragging={currentlyDragging}
        onDrop={handleDrop}
      />
      <button onClick={saveCharacter}>Save Character</button>
    </div>
  );
};

export default App;
