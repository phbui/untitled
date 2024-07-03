import React, { useState } from "react";
import DressUpItem from "./DressUpItem";

export interface Inteface_Wardrobe {
  [key: string]: Interface_Wardrobe_Item[];
}

export interface Interface_Wardrobe_Item {
  key: string;
  description: string;
  asset_url: string;
}

interface Props_DressUpWardrobe {
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const DressUpWardrobe: React.FC<Props_DressUpWardrobe> = ({ onDrop }) => {
  const [selectedTab, setSelectedTab] = useState<string>("hats");

  const wardrobeItems: Inteface_Wardrobe = {
    hats: [
      {
        key: "hat1",
        description: "Red Hat",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
      {
        key: "hat2",
        description: "Blue Hat",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
    accessories: [
      {
        key: "jewel1",
        description: "Gold Necklace",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
      {
        key: "jewel2",
        description: "Silver Bracelet",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
    handheld: [
      {
        key: "purse1",
        description: "Red Purse",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
    shirts: [
      {
        key: "shirt1",
        description: "White Shirt",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
      {
        key: "shirt2",
        description: "Black Shirt",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
    jackets: [
      {
        key: "jacket1",
        description: "Leather Jacket",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
      {
        key: "jacket2",
        description: "Denim Jacket",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
    pants: [
      {
        key: "pants1",
        description: "Blue Jeans",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
      {
        key: "pants2",
        description: "Black Trousers",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
    shoes: [
      {
        key: "shoes1",
        description: "Sneakers",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
      {
        key: "shoes2",
        description: "Boots",
        asset_url:
          "https://m.media-amazon.com/images/I/61WBFfETdrL._AC_SX679_.jpg",
      },
    ],
  };

  const renderItems = () => {
    return wardrobeItems[selectedTab].map((item) => (
      <div key={item.key} className="wardrobe-item">
        <DressUpItem item={item} onDrop={() => onDrop(selectedTab, item)} />
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
