import { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper"; //ignore this lol

export interface Character_Item {
  name: string;
  url: string;
  desc: string;
}

interface Props_Wardrobe_Item {
  type: WardrobeCategory;
  item: Character_Item;
  equippedItems?: Character;
  onClick: () => void;
}

const Wardrobe_Item: React.FC<Props_Wardrobe_Item> = ({
  type,
  item,
  equippedItems,
  onClick,
}) => {
  const [isEquipped, setIsEquipped] = useState<boolean>(false);

  const checkEquipped = (
    item: Character_Item,
    category: WardrobeCategory
  ): boolean => {
    if (!equippedItems) {
      return false;
    }

    switch (category) {
      case "hair":
        return equippedItems.hair?.name === item.name;
      case "eyes":
        return equippedItems.eyes?.name === item.name;
      case "torso":
        return equippedItems.torso.some((tor) => tor.name === item.name);
      case "legs":
        return equippedItems.legs?.name === item.name;
      case "feet":
        return equippedItems.feet?.name === item.name;
      case "accessory":
        return equippedItems.accessories.some((acc) => acc.name === item.name);
      default:
        return false;
    }
  };

  useEffect(() => {
    setIsEquipped(checkEquipped(item, type));
  }, [item, equippedItems]);

  return (
    <div
      className={`wardrobe-item ${isEquipped ? "equipped" : ""}`}
      onClick={onClick}
    >
      <img src={item.url} alt={item.name} />
    </div>
  );
};

interface Props_Wardrobe_Tab {
  type: WardrobeCategory;
  items: Character_Item[];
  equippedItems?: Character;
  onItemSelect?: (item: Character_Item, tabname: string) => void;
}

const Wardrobe_Tab: React.FC<Props_Wardrobe_Tab> = ({
  type,
  items,
  equippedItems,
  onItemSelect,
}) => {
  return (
    <div className="wardrobe-tab-content">
      {items.map((item) => {
        return (
          <Wardrobe_Item
            key={item.name}
            type={type}
            item={item}
            equippedItems={equippedItems}
            onClick={() => onItemSelect && onItemSelect(item, type)}
          />
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
    type: "hair",
    items: [
      {
        name: "Long & Purple Hair",
        url: "/assets/clothes/hair/long-purple.png",
        desc: "",
      },
      {
        name: "Short & Green Hair",
        url: "/assets/clothes/hair/short-green.png",
        desc: "",
      },
      {
        name: "Curly & Blue Hair",
        url: "/assets/clothes/hair/curly-blue.png",
        desc: "",
      },
    ],
  },
  {
    type: "eyes",
    items: [
      {
        name: "Crazy Eyes",
        url: "/assets/clothes/eyes/crazy-eyes.png",
        desc: "",
      },
      {
        name: "Cute Eyes",
        url: "/assets/clothes/eyes/cute-eyes.png",
        desc: "",
      },
      {
        name: "Dead Eyes",
        url: "/assets/clothes/eyes/dead-eyes.png",
        desc: "",
      },
    ],
  },
  {
    type: "torso",
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
      {
        name: "Dotted Dress",
        url: "/assets/clothes/torso/dotted-dress.png",
        desc: "",
      },
      {
        name: "Striped Top",
        url: "/assets/clothes/torso/striped-top.png",
        desc: "",
      },
    ],
  },
  {
    type: "legs",
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
      {
        name: "Red Skirt",
        url: "/assets/clothes/legs/red-skirt.png",
        desc: "",
      },
    ],
  },
  {
    type: "feet",
    items: [
      {
        name: "Purple Kicks",
        url: "/assets/clothes/feet/purple-kicks.png",
        desc: "",
      },
      {
        name: "Red Heels",
        url: "/assets/clothes/feet/red-heels.png",
        desc: "",
      },
      {
        name: "Buckle Boots",
        url: "/assets/clothes/feet/buckle-boots.png",
        desc: "",
      },
    ],
  },
  {
    type: "accessory",
    items: [
      {
        name: "Geek Bar",
        url: "/assets/clothes/accessory/geek-bar.png",
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
      {
        name: "Bandage Socks",
        url: "/assets/clothes/accessory/bandage-socks.png",
        desc: "",
      },
      {
        name: "Eye Tie",
        url: "/assets/clothes/accessory/eye-tie.png",
        desc: "",
      },
      {
        name: "Just a Fish",
        url: "/assets/clothes/accessory/fish.png",
        desc: "",
      },
      {
        name: "Goggles",
        url: "/assets/clothes/accessory/goggles.png",
        desc: "",
      },
      {
        name: "Lobster Cap",
        url: "/assets/clothes/accessory/lobster-cap.png",
        desc: "",
      },
      {
        name: "Sweatband",
        url: "/assets/clothes/accessory/sweatband.png",
        desc: "",
      },
    ],
  },
];

interface Props_Phone {
  click: (title: string) => void;
}

const Phone: React.FC<Props_Phone> = ({ click }) => {
  const handleAreaClick = (area: any) => {
    console.log(area);
    click(area.name);
  };

  const firstArea = MAP.areas[0];
  const left = Math.min(...firstArea.coords.filter((_, idx) => idx % 2 === 0));
  const top = Math.min(...firstArea.coords.filter((_, idx) => idx % 2 === 1));
  const width =
    Math.max(...firstArea.coords.filter((_, idx) => idx % 2 === 0)) - left;
  const height =
    Math.max(...firstArea.coords.filter((_, idx) => idx % 2 === 1)) - top;

  return (
    <div className="phone-container">
      <ImageMapper
        src={"/assets/phone.png"}
        map={MAP}
        onClick={(area: any) => handleAreaClick(area)}
      />
    </div>
  );
};

const Wardrobe: React.FC<Props_Wardrobe> = ({ onItemSelect, character }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (title: string) => {
    setActiveTab((prevTab) => (prevTab === title ? null : title));
  };

  return (
    <div className="wardrobe">
      <Phone click={handleTabClick} />
      {wardrobe_tabs.map(
        (wardrobe_tab) =>
          activeTab === wardrobe_tab.type && (
            <Wardrobe_Tab
              key={wardrobe_tab.type}
              type={wardrobe_tab.type}
              items={wardrobe_tab.items}
              onItemSelect={onItemSelect}
              equippedItems={character}
            />
          )
      )}
    </div>
  );
};

type WardrobeCategory =
  | "hair"
  | "eyes"
  | "torso"
  | "legs"
  | "feet"
  | "accessory";

export interface Character {
  name: string;
  hair: Character_Item | null;
  eyes: Character_Item | null;
  torso: Character_Item[];
  legs: Character_Item | null;
  feet: Character_Item | null;
  accessories: Character_Item[];
}

export interface Props_Character {
  character?: Character;
}

const Character: React.FC<Props_Character> = ({ character }) => {
  const defaultImage = "/assets/clothes/empty.png";

  return (
    character && (
      <div className="character">
        <img className="base" src="/assets/clothes/base.png" alt="base" />
        <img
          className="hair"
          src={character.hair?.url || defaultImage}
          alt="hair"
        />
        <img
          className="eyes"
          src={character.eyes?.url || defaultImage}
          alt="eyes"
        />
        {character.torso.map((torso: Character_Item) => (
          <img
            key={torso.name}
            className={`torso ${torso.name}`}
            src={torso.url || defaultImage}
            alt={torso.name}
          />
        ))}
        <img
          className="legs"
          src={character.legs?.url || defaultImage}
          alt="legs"
        />
        <img
          className="feet"
          src={character.feet?.url || defaultImage}
          alt="feet"
        />
        {character.accessories.map((accessory: Character_Item) => (
          <img
            key={accessory.name}
            className={`accessory ${accessory.name}`}
            src={accessory.url || defaultImage}
            alt={accessory.name}
          />
        ))}
      </div>
    )
  );
};

const Creation = () => {
  const [character, setCharacter] = useState<Character>({
    name: "Default",
    hair: wardrobe_tabs[0].items[0],
    eyes: wardrobe_tabs[1].items[0],
    torso: [wardrobe_tabs[2].items[0]],
    legs: wardrobe_tabs[3].items[0],
    feet: wardrobe_tabs[4].items[0],
    accessories: [],
  });

  const handleItemSelect = (item: Character_Item, name: string) => {
    setCharacter((prevCharacter) => {
      const newCharacter = { ...prevCharacter };

      switch (name) {
        case "hair":
          newCharacter.hair =
            newCharacter.hair?.name === item.name ? null : item;
          break;
        case "eyes":
          newCharacter.eyes =
            newCharacter.eyes?.name === item.name ? null : item;
          break;
        case "torso":
          if (newCharacter.torso.some((tor) => tor.name === item.name)) {
            newCharacter.torso = newCharacter.torso.filter(
              (tor) => tor.name !== item.name
            );
          } else {
            newCharacter.torso = [...newCharacter.torso, item];
          }
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

const MAP = {
  name: "my-map",
  // GET JSON FROM BELOW URL AS AN EXAMPLE
  areas: [
    {
      name: "screen",
      shape: "rect",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [216, 118, 682, 657],
      polygon: [
        [216, 118],
        [682, 118],
        [682, 657],
        [216, 657],
      ],
    },
    {
      name: "next",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        700, 304, 772, 307, 779, 327, 779, 409, 775, 438, 761, 450, 711, 450,
        701, 438, 701, 319,
      ],
      polygon: [
        [700, 304],
        [772, 307],
        [779, 327],
        [779, 409],
        [775, 438],
        [761, 450],
        [711, 450],
        [701, 438],
        [701, 319],
      ],
    },
    {
      name: "hair",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        812, 175, 823, 163, 885, 163, 903, 166, 922, 186, 925, 219, 927, 274,
        906, 288, 870, 291, 828, 269, 812, 213,
      ],
      polygon: [
        [812, 175],
        [823, 163],
        [885, 163],
        [903, 166],
        [922, 186],
        [925, 219],
        [927, 274],
        [906, 288],
        [870, 291],
        [828, 269],
        [812, 213],
      ],
    },
    {
      name: "torso",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        832, 339, 870, 320, 904, 320, 928, 334, 932, 413, 928, 438, 911, 454,
        862, 454, 833, 445, 817, 406, 818, 365,
      ],
      polygon: [
        [832, 339],
        [870, 320],
        [904, 320],
        [928, 334],
        [932, 413],
        [928, 438],
        [911, 454],
        [862, 454],
        [833, 445],
        [817, 406],
        [818, 365],
      ],
    },
    {
      name: "pants",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        959, 312, 985, 309, 1018, 321, 1054, 330, 1065, 350, 1067, 405, 1051,
        444, 985, 457, 959, 461, 948, 446, 946, 370, 954, 331,
      ],
      polygon: [
        [959, 312],
        [985, 309],
        [1018, 321],
        [1054, 330],
        [1065, 350],
        [1067, 405],
        [1051, 444],
        [985, 457],
        [959, 461],
        [948, 446],
        [946, 370],
        [954, 331],
      ],
    },
    {
      name: "eyes",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        940, 163, 956, 154, 999, 152, 1039, 164, 1054, 191, 1062, 251, 1055,
        279, 1029, 288, 966, 274, 945, 253, 939, 201,
      ],
      polygon: [
        [940, 163],
        [956, 154],
        [999, 152],
        [1039, 164],
        [1054, 191],
        [1062, 251],
        [1055, 279],
        [1029, 288],
        [966, 274],
        [945, 253],
        [939, 201],
      ],
    },
    {
      name: "feet",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        909, 489, 851, 489, 821, 508, 803, 565, 802, 608, 828, 625, 890, 629,
        907, 614, 922, 593, 923, 509,
      ],
      polygon: [
        [909, 489],
        [851, 489],
        [821, 508],
        [803, 565],
        [802, 608],
        [828, 625],
        [890, 629],
        [907, 614],
        [922, 593],
        [923, 509],
      ],
    },
    {
      name: "accessories",
      shape: "poly",
      fillColor: "#eab54d4d",
      strokeColor: "black",
      coords: [
        945, 514, 1017, 483, 1046, 484, 1056, 503, 1060, 549, 1052, 586, 1022,
        610, 966, 620, 940, 610, 935, 549,
      ],
      polygon: [
        [945, 514],
        [1017, 483],
        [1046, 484],
        [1056, 503],
        [1060, 549],
        [1052, 586],
        [1022, 610],
        [966, 620],
        [940, 610],
        [935, 549],
      ],
    },
  ],
};
