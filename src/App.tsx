import React, { useState, useEffect } from "react";
import DressUpCharacter from "./components/DressUpCharacter";
import DressUpWardrobe, {
  Interface_Wardrobe_Item,
} from "./components/DressUpWardrobe";
import CharacterCatalog from "./components/CharacterCatalog";

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>(
    {
      hat: "",
      accessories: "",
      shirt: "",
      jacket: "",
      pants: "",
      shoes: "",
    }
  );

  const [catalog, setCatalog] = useState<
    { id: number; items: { [key: string]: string } }[]
  >([]);

  const handleDrop = (type: string, item: Interface_Wardrobe_Item) => {
    console.log(selectedItems);

    setSelectedItems((prevItems) => ({
      ...prevItems,
      [type]: item.asset_url,
    }));
  };

  const saveCharacter = () => {
    const newCharacter = { id: Date.now(), items: selectedItems };
    setCatalog([...catalog, newCharacter]);
    localStorage.setItem(
      "characterCatalog",
      JSON.stringify([...catalog, newCharacter])
    );
  };

  const loadCatalog = () => {
    const savedCatalog = localStorage.getItem("characterCatalog");
    if (savedCatalog) {
      setCatalog(JSON.parse(savedCatalog));
    }
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
