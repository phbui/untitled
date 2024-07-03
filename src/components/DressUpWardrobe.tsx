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

const DressUpWardrobe: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("hats");

  const wardrobeItems: Inteface_Wardrobe = {
    hats: [
      {
        key: "hat1",
        description: "Red Hat",
        asset_url: "https://example.com/red_hat.png",
      },
      {
        key: "hat2",
        description: "Blue Hat",
        asset_url: "https://example.com/blue_hat.png",
      },
    ],
    accessories: [
      {
        key: "jewel1",
        description: "Gold Necklace",
        asset_url: "https://example.com/gold_necklace.png",
      },
      {
        key: "jewel2",
        description: "Silver Bracelet",
        asset_url: "https://example.com/silver_bracelet.png",
      },
    ],
    handheld: [
      {
        key: "purse1",
        description: "Red Purse",
        asset_url: "https://example.com/red_purse.png",
      },
    ],
    shirts: [
      {
        key: "shirt1",
        description: "White Shirt",
        asset_url: "https://example.com/white_shirt.png",
      },
      {
        key: "shirt2",
        description: "Black Shirt",
        asset_url: "https://example.com/black_shirt.png",
      },
    ],
    jackets: [
      {
        key: "jacket1",
        description: "Leather Jacket",
        asset_url: "https://example.com/leather_jacket.png",
      },
      {
        key: "jacket2",
        description: "Denim Jacket",
        asset_url: "https://example.com/denim_jacket.png",
      },
    ],
    pants: [
      {
        key: "pants1",
        description: "Blue Jeans",
        asset_url: "https://example.com/blue_jeans.png",
      },
      {
        key: "pants2",
        description: "Black Trousers",
        asset_url: "https://example.com/black_trousers.png",
      },
    ],
    shoes: [
      {
        key: "shoes1",
        description: "Sneakers",
        asset_url: "https://example.com/sneakers.png",
      },
      {
        key: "shoes2",
        description: "Boots",
        asset_url: "https://example.com/boots.png",
      },
    ],
  };

  const renderItems = () => {
    return wardrobeItems[selectedTab].map((item) => (
      <div key={item.key} className="wardrobe-item">
        <DressUpItem item={item} />
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
