import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import DressUpCharacter from "./components/DressUpCharacter";
import BottomTabs from "./components/BottomTabs";
import { Interface_Wardrobe_Item } from "./components/BottomTabs";
import SignIn from "./components/SignIn";

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
  const [user, setUser] = useState<any>();
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
      setCharacterName(""); // Clear the input field after saving
    } catch (e) {
      console.error("Error adding document: ", e);
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
      <SignIn user={user} setUser={setUser} />
      <BottomTabs
        user={user}
        onSelect={setSelectedItems}
        startDrag={handleDrag}
        onDrop={handleDrop}
      />
      <DressUpCharacter
        clothingItems={selectedItems}
        currentlyDragging={currentlyDragging}
        onDrop={handleDrop}
      />
      <input
        type="text"
        placeholder="Enter character name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <button onClick={saveCharacter}>Save Character</button>
    </div>
  );
};

export default App;
