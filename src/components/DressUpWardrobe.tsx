import React, { useState } from "react";
import DressUpItem from "./DressUpItem";

export interface Inteface_Wardrobe {
  [key: string]: Interface_Wardrobe_Item[];
}

export interface Interface_Wardrobe_Item {
  key: string;
  type: string;
  description: string;
  asset_url: string;
}

interface Props_DressUpWardrobe {
  startDrag: (item: Interface_Wardrobe_Item) => void;
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const DressUpWardrobe: React.FC<Props_DressUpWardrobe> = ({
  startDrag,
  onDrop,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("hat");

  const wardrobeItems: Inteface_Wardrobe = {
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

  const renderItems = () => {
    return wardrobeItems[selectedTab].map((item) => (
      <div key={item.key} className="wardrobe-item">
        <DressUpItem
          item={item}
          startDrag={() => startDrag(item)}
          onDrop={() => onDrop(selectedTab, item)}
        />
      </div>
    ));
  };

  return (
    <div className="wardrobe">
      <div className="tabs">
        {Object.keys(wardrobeItems).map((tab) => (
          <button key={tab} onClick={() => setSelectedTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="items">{renderItems()}</div>
    </div>
  );
};

export default DressUpWardrobe;
