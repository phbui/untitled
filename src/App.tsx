import React, { useState, useEffect } from "react";
import DressUpCharacter from "./components/DressUpCharacter";
import DressUpWardrobe, {
  Interface_Wardrobe_Item,
} from "./components/DressUpWardrobe";
import CharacterCatalog from "./components/CharacterCatalog";
import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

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

  const handleDrop = (type: string, item: Interface_Wardrobe_Item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [type]: item,
    }));
  };

  const saveCharacter = async () => {
    try {
      const newCharacter = { items: selectedItems };
      const docRef = await addDoc(collection(db, "characters"), newCharacter);
      setCatalog([...catalog, { id: docRef.id, items: selectedItems }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const loadCatalog = async () => {
    const querySnapshot = await getDocs(collection(db, "characters"));
    const loadedCatalog = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      items: doc.data().items as { [key: string]: Interface_Wardrobe_Item },
    }));
    setCatalog(loadedCatalog);
  };

  // Load catalog on initial render
  useEffect(() => {
    loadCatalog();
  }, []);

  return (
    <div className="App">
      <DressUpWardrobe onDrop={handleDrop} />
      <DressUpCharacter clothingItems={selectedItems} onDrop={handleDrop} />
      <button onClick={saveCharacter}>Save Character</button>
      <CharacterCatalog catalog={catalog} />
    </div>
  );
};

export default App;
