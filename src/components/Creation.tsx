import { useState } from "react";

export interface Character_Item {
  key: string;
  url: string;
  desc: string;
}

interface Props_Wardrobe_Tab {
  key: string;
  items: Character_Item[];
}

const Wardrobe_Tab: React.FC<Props_Wardrobe_Tab> = ({ items }) => {
  return (
    <div className="wardrobe-tab-content">
      {items.map((item) => (
        <div key={item.key} className="wardrobe-item">
          <img src={item.url} alt={item.key} />
        </div>
      ))}
    </div>
  );
};

interface Props_Wardrobe {}

const wardrobe_tabs: Props_Wardrobe_Tab[] = [
  {
    key: "Head",
    items: [
      {
        key: "Long & Purple Hair",
        url: "/assets/clothes/head/long-purple-hair.png",
        desc: "",
      },
      {
        key: "Short & Green Hair",
        url: "/assets/clothes/head/short-green-hair.png",
        desc: "",
      },
    ],
  },
  {
    key: "Torso",
    items: [
      {
        key: "Arcane Polo",
        url: "/assets/clothes/torso/arcane-polo.png",
        desc: "",
      },
      {
        key: "Tank & Tee",
        url: "/assets/clothes/torso/green-tank+longsleeve.png",
        desc: "",
      },
      {
        key: "Mermaid Dress",
        url: "/assets/clothes/torso/water-dress.png",
        desc: "",
      },
    ],
  },
  {
    key: "Legs",
    items: [
      {
        key: "Fish Cargos",
        url: "/assets/clothes/legs/fish-cargos.png",
        desc: "",
      },
      {
        key: "Zig-Zag Jeans",
        url: "/assets/clothes/legs/zig-zag-jeans.png",
        desc: "",
      },
    ],
  },
  {
    key: "Feet",
    items: [
      {
        key: "Bandage Socks",
        url: "/assets/clothes/feet/bandage-socks.png",
        desc: "",
      },
      {
        key: "Purple Kicks",
        url: "/assets/clothes/feet/purple-kicks.png",
        desc: "",
      },
    ],
  },
  {
    key: "Accessory",
    items: [
      {
        key: "Geek Bar",
        url: "/assets/clothes/accessory/geek-bar.png",
        desc: "",
      },
      {
        key: "Crazy Eyes",
        url: "/assets/clothes/accessory/crazy-eyes.png",
        desc: "",
      },
      {
        key: "Grommet Belt",
        url: "/assets/clothes/accessory/grommet-belt.png",
        desc: "",
      },
      {
        key: "Hair Clips",
        url: "/assets/clothes/accessory/hair-clips.png",
        desc: "",
      },
      {
        key: "Headphones",
        url: "/assets/clothes/accessory/headphones.png",
        desc: "",
      },
    ],
  },
];

const Wardrobe: React.FC<Props_Wardrobe> = ({}) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (title: string) => {
    setActiveTab((prevTab) => (prevTab === title ? null : title));
  };

  return (
    <div className={`wardrobe ${activeTab ? "open" : "closed"}`}>
      <div className="wardrobe-tabs">
        {wardrobe_tabs.map((wardrobe_tab) => (
          <button
            key={wardrobe_tab.key}
            className={`tab-button ${
              activeTab === wardrobe_tab.key ? "active" : ""
            }`}
            onClick={() => handleTabClick(wardrobe_tab.key)}
          >
            {wardrobe_tab.key}
          </button>
        ))}
      </div>
      {wardrobe_tabs.map(
        (wardrobe_tab) =>
          activeTab === wardrobe_tab.key && (
            <Wardrobe_Tab key={wardrobe_tab.key} items={wardrobe_tab.items} />
          )
      )}
    </div>
  );
};

export interface Character {
  name: string;
  head: Character_Item;
  torso: Character_Item;
  legs: Character_Item;
  feet: Character_Item;
  accessories: Character_Item[];
}

export interface Props_Character {
  character?: Character;
}

const Character: React.FC<Props_Character> = ({ character }) => {
  return (
    character && (
      <div className="character">
        <img className="head" src={character.head.url} />
        <img className="torso" src={character.head.url} />
        <img className="legs" src={character.head.url} />
        <img className="feet" src={character.head.url} />
        {character.accessories.map((accessory: Character_Item) => {
          return (
            <img className={`accessory ${accessory.key}`} src={accessory.url} />
          );
        })}
      </div>
    )
  );
};

const Creation = () => {
  const [character, setCharacter] = useState<Character>();

  return (
    <div>
      <Character character={character} />
      <Wardrobe />
    </div>
  );
};

export default Creation;
