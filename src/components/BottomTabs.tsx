import React, { useState } from "react";
import DressUpItem from "./DressUpItem";
import CharacterCatalog from "./CharacterCatalog";
import { Interface_Character } from "../App";

interface Interface_Wardrobe {
  [key: string]: {
    icon_url: string;
    label: string;
    items: Interface_Wardrobe_Item[];
  };
}

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
  catalog: Interface_Character[];
  setCatalog: (catalog: Interface_Character[]) => void;
}

const wardrobeItems: Interface_Wardrobe = {
  hat: {
    icon_url: "src/assets/hat.svg",
    label: "Helmet",
    items: [
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
  },
  accessory: {
    icon_url: "src/assets/necklace.svg",
    label: "Accessory",
    items: [
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
  },
  jacket: {
    icon_url: "src/assets/robe.svg",
    label: "Armor",
    items: [
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
  },
  shirt: {
    icon_url: "src/assets/shirt.svg",
    label: "Tunic",
    items: [
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
  },
  handheld: {
    icon_url: "src/assets/wand.svg",
    label: "Weapon",
    items: [
      {
        key: "purse1",
        type: "handheld",
        description: "Red Purse",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
  },
  pants: {
    icon_url: "src/assets/pants.svg",
    label: "Leggings",
    items: [
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
  },
  shoes: {
    icon_url: "src/assets/shoes.svg",
    label: "Boots",
    items: [
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
  },
};

const BottomTabs: React.FC<Props_BottomTabs> = ({
  user,
  onSelect,
  startDrag,
  onDrop,
  catalog,
  setCatalog,
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
            <img src={wardrobeItems[tab].icon_url} alt={`${tab} icon`} />
            <p>{wardrobeItems[tab].label}</p>
          </button>
        ))}
        <button
          className={`tab-button ${openTab === "catalog" ? "active" : ""}`}
          onClick={() => handleTabClick("catalog")}
        >
          <img src="src/assets/catalog.svg" alt="Catalog icon" />
          <p>Catalog</p>
        </button>
      </div>
      {Object.keys(wardrobeItems).map((tab) => (
        <div
          key={tab}
          className={`tab-content ${openTab === tab ? "open" : ""}`}
        >
          {renderItems(wardrobeItems[tab].items)}
        </div>
      ))}
      <div className={`tab-content ${openTab === "catalog" ? "open" : ""}`}>
        <CharacterCatalog
          user={user}
          catalog={catalog}
          setCatalog={setCatalog}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default BottomTabs;
