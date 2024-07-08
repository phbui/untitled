import { useState } from "react";

export interface Character_Item {
  name: string;
  url: string;
  desc: string;
}

interface Props_Wardrobe_Tab {
  name: string;
  items: Character_Item[];
  onItemSelect?: (item: Character_Item, tabname: string) => void;
  equippedItems?: Character;
}

const Wardrobe_Tab: React.FC<Props_Wardrobe_Tab> = ({
  name,
  items,
  onItemSelect,
  equippedItems,
}) => {
  const isEquipped = (
    item: Character_Item,
    category: WardrobeCategory
  ): boolean => {
    if (equippedItems) {
      if (category === "accessory") {
        return equippedItems.accessories.some((acc) => acc.name === item.name);
      } else {
        return equippedItems[category]?.name === item.name;
      }
    }
    return false;
  };

  return (
    <div className="wardrobe-tab-content">
      {items.map((item) => {
        const equipped = isEquipped(item, name as WardrobeCategory);
        console.log(equipped);
        return (
          <div
            key={item.name}
            className={`wardrobe-item ${equipped ? "equipped" : ""}`}
            onClick={() => {
              if (onItemSelect !== undefined) onItemSelect(item, name);
            }}
          >
            <img src={item.url} alt={item.name} />
          </div>
        );
      })}
    </div>
  );
};

interface Props_Wardrobe {
  onItemSelect: (item: Character_Item, tabname: string) => void;
  character: Character;
}

const wardrobe_tabs: Props_Wardrobe_Tab[] = [
  {
    name: "Head",
    items: [
      {
        name: "Long & Purple Hair",
        url: "/assets/clothes/head/long-purple-hair.png",
        desc: "",
      },
      {
        name: "Short & Green Hair",
        url: "/assets/clothes/head/short-green-hair.png",
        desc: "",
      },
    ],
  },
  {
    name: "Torso",
    items: [
      {
        name: "Arcane Polo",
        url: "/assets/clothes/torso/arcane-polo.png",
        desc: "",
      },
      {
        name: "Tank & Tee",
        url: "/assets/clothes/torso/green-tank+longsleeve.png",
        desc: "",
      },
      {
        name: "Mermaid Dress",
        url: "/assets/clothes/torso/water-dress.png",
        desc: "",
      },
    ],
  },
  {
    name: "Legs",
    items: [
      {
        name: "Fish Cargos",
        url: "/assets/clothes/legs/fish-cargos.png",
        desc: "",
      },
      {
        name: "Zig-Zag Jeans",
        url: "/assets/clothes/legs/zig-zag-jeans.png",
        desc: "",
      },
    ],
  },
  {
    name: "Feet",
    items: [
      {
        name: "Bandage Socks",
        url: "/assets/clothes/feet/bandage-socks.png",
        desc: "",
      },
      {
        name: "Purple Kicks",
        url: "/assets/clothes/feet/purple-kicks.png",
        desc: "",
      },
    ],
  },
  {
    name: "Accessory",
    items: [
      {
        name: "Geek Bar",
        url: "/assets/clothes/accessory/geek-bar.png",
        desc: "",
      },
      {
        name: "Crazy Eyes",
        url: "/assets/clothes/accessory/crazy-eyes.png",
        desc: "",
      },
      {
        name: "Grommet Belt",
        url: "/assets/clothes/accessory/grommet-belt.png",
        desc: "",
      },
      {
        name: "Hair Clips",
        url: "/assets/clothes/accessory/hair-clips.png",
        desc: "",
      },
      {
        name: "Headphones",
        url: "/assets/clothes/accessory/headphones.png",
        desc: "",
      },
    ],
  },
];

const Wardrobe: React.FC<Props_Wardrobe> = ({ onItemSelect, character }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (title: string) => {
    setActiveTab((prevTab) => (prevTab === title ? null : title));
  };

  return (
    <div className={`wardrobe`}>
      {wardrobe_tabs.map(
        (wardrobe_tab) =>
          activeTab === wardrobe_tab.name && (
            <Wardrobe_Tab
              key={wardrobe_tab.name}
              name={wardrobe_tab.name}
              items={wardrobe_tab.items}
              onItemSelect={onItemSelect}
              equippedItems={character}
            />
          )
      )}
      <div className="wardrobe-tabs">
        {wardrobe_tabs.map((wardrobe_tab) => (
          <button
            key={wardrobe_tab.name}
            className={`tab-button ${
              activeTab === wardrobe_tab.name ? "active" : ""
            }`}
            onClick={() => handleTabClick(wardrobe_tab.name)}
          >
            {wardrobe_tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

type WardrobeCategory = "head" | "torso" | "legs" | "feet" | "accessory";

export interface Character {
  name: string;
  head: Character_Item | null;
  torso: Character_Item | null;
  legs: Character_Item | null;
  feet: Character_Item | null;
  accessories: Character_Item[];
}

export interface Props_Character {
  character?: Character;
}

const Character: React.FC<Props_Character> = ({ character }) => {
  return (
    character && (
      <div className="character">
        <img className="base" src="assets/clothes/base.png" />
        <img className="head" src={character.head?.url} />
        <img className="torso" src={character.torso?.url} />
        <img className="legs" src={character.legs?.url} />
        <img className="feet" src={character.feet?.url} />
        {character.accessories.map((accessory: Character_Item) => (
          <img
            key={accessory.name}
            className={`accessory ${accessory.name}`}
            src={accessory.url}
          />
        ))}
      </div>
    )
  );
};

const Creation = () => {
  const [character, setCharacter] = useState<Character>({
    name: "Default",
    head: wardrobe_tabs[0].items[0],
    torso: wardrobe_tabs[1].items[0],
    legs: wardrobe_tabs[2].items[0],
    feet: wardrobe_tabs[3].items[0],
    accessories: [],
  });

  const handleItemSelect = (item: Character_Item, name: string) => {
    setCharacter((prevCharacter) => {
      const newCharacter = { ...prevCharacter };

      switch (name.toLowerCase()) {
        case "head":
          newCharacter.head =
            newCharacter.head?.name === item.name ? null : item;
          break;
        case "torso":
          newCharacter.torso =
            newCharacter.torso?.name === item.name ? null : item;
          break;
        case "legs":
          newCharacter.legs =
            newCharacter.legs?.name === item.name ? null : item;
          break;
        case "feet":
          newCharacter.feet =
            newCharacter.feet?.name === item.name ? null : item;
          break;
        case "accessory":
          if (newCharacter.accessories.some((acc) => acc.name === item.name)) {
            newCharacter.accessories = newCharacter.accessories.filter(
              (acc) => acc.name !== item.name
            );
          } else {
            newCharacter.accessories = [...newCharacter.accessories, item];
          }
          break;
        default:
          break;
      }
      return newCharacter;
    });
  };

  return (
    <div className="section-content">
      <Character character={character} />
      <Wardrobe onItemSelect={handleItemSelect} character={character} />
    </div>
  );
};

export default Creation;
