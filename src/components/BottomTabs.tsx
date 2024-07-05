import React, { useState } from "react";
import DressUpItem from "./DressUpItem";
import CharacterCatalog from "./CharacterCatalog";

export interface Interface_Wardrobe_Item {
  key: string;
  type: string;
  description: string;
  asset_url: string;
}

interface Props_BottomTabs {
  user: any;
  onSelect: (items: { [key: string]: Interface_Wardrobe_Item }) => void;
  startDrag: (item: Interface_Wardrobe_Item) => void;
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const wardrobeItems: { [key: string]: Interface_Wardrobe_Item[] } = {
  hat: [
    {
      key: "hat1",
      type: "hat",
      description: "Red Hat",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
    {
      key: "hat2",
      type: "hat",
      description: "Blue Hat",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
  accessory: [
    {
      key: "jewel1",
      type: "accessory",
      description: "Gold Necklace",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
    {
      key: "jewel2",
      type: "accessory",
      description: "Silver Bracelet",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
  handheld: [
    {
      key: "purse1",
      type: "handheld",
      description: "Red Purse",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
  shirt: [
    {
      key: "shirt1",
      type: "shirt",
      description: "White Shirt",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
    {
      key: "shirt2",
      type: "shirt",
      description: "Black Shirt",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
  jacket: [
    {
      key: "jacket1",
      type: "jacket",
      description: "Leather Jacket",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
    {
      key: "jacket2",
      type: "jacket",
      description: "Denim Jacket",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
  pants: [
    {
      key: "pants1",
      type: "pants",
      description: "Blue Jeans",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
    {
      key: "pants2",
      type: "pants",
      description: "Black Trousers",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
  shoes: [
    {
      key: "shoes1",
      type: "shoes",
      description: "Sneakers",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
    {
      key: "shoes2",
      type: "shoes",
      description: "Boots",
      asset_url:
        "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
    },
  ],
};

const BottomTabs: React.FC<Props_BottomTabs> = ({
  user,
  onSelect,
  startDrag,
  onDrop,
}) => {
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    if (openTab === tab) {
      setIsOpen(false);
      setOpenTab(null);
    } else {
      setIsOpen(true);
      setOpenTab(tab);
    }
  };

  const renderItems = (items: Interface_Wardrobe_Item[]) => {
    return items.map((item) => (
      <DressUpItem
        key={item.key}
        item={item}
        startDrag={() => startDrag(item)}
        onDrop={() => onDrop(item.type, item)}
      />
    ));
  };

  return (
    <div className={`bottom-tabs ${isOpen ? "open" : ""}`}>
      <div className="tab-buttons">
        {Object.keys(wardrobeItems).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${openTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
        <button
          className={`tab-button ${openTab === "catalog" ? "active" : ""}`}
          onClick={() => handleTabClick("catalog")}
        >
          Catalog
        </button>
      </div>
      {Object.keys(wardrobeItems).map((tab) => (
        <div
          key={tab}
          className={`tab-content ${openTab === tab ? "open" : ""}`}
        >
          {renderItems(wardrobeItems[tab])}
        </div>
      ))}
      <div className={`tab-content ${openTab === "catalog" ? "open" : ""}`}>
        <CharacterCatalog user={user} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default BottomTabs;
