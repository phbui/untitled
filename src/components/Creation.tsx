import { useContext, useEffect, useRef, useState } from "react";
import ImageMapper from "react-image-mapper"; //ignore this lol
import { MAP, wardrobe_tabs } from "../dummydata";
import { User } from "../App";

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
  const [zoomedSrc, setZoomedSrc] = useState<string>(item.url);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const img = new Image();
    img.src = item.url;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const { data } = imageData;

          let minX = canvas.width;
          let minY = canvas.height;
          let maxX = 0;
          let maxY = 0;

          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const index = (y * canvas.width + x) * 4;
              const alpha = data[index + 3];

              if (alpha > 0) {
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
              }
            }
          }

          const contentWidth = maxX - minX;
          const contentHeight = maxY - minY;

          const zoomCanvas = document.createElement("canvas");
          const zoomCtx = zoomCanvas.getContext("2d");

          if (zoomCtx) {
            zoomCanvas.width = contentWidth;
            zoomCanvas.height = contentHeight;
            zoomCtx.drawImage(
              canvas,
              minX,
              minY,
              contentWidth,
              contentHeight,
              0,
              0,
              contentWidth,
              contentHeight
            );

            const zoomedImageURL = zoomCanvas.toDataURL();
            setZoomedSrc(zoomedImageURL);
          }
        }
      }
    };
  }, [item.url]);

  return (
    <div
      className={`wardrobe-item ${isEquipped ? "equipped" : ""}`}
      onClick={onClick}
    >
      <img src={zoomedSrc} alt={item.name} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export interface Props_Wardrobe_Tab {
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
    <>
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
    </>
  );
};

interface Props_Phone {
  openModal: () => void;
  character?: Character;
  onItemSelect?: (item: Character_Item, tabname: string) => void;
}

const Phone: React.FC<Props_Phone> = ({
  onItemSelect,
  character,
  openModal,
}) => {
  const [scalingFactor, setScalingFactor] = useState<number>(1);
  const [topOffset, setTopOffset] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("hair");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const itemsPerPage = 4;

  const startGame = () => {
    openModal();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setScalingFactor(-2.4);
        setTopOffset(8);
      } else {
        setScalingFactor(40);
        setTopOffset(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAreaClick = (area: any) => {
    switch (area.name) {
      case "screen":
        break;
      case "play":
        startGame();
        break;
      case "back":
        const totalPages = Math.ceil(wardrobe_tabs.length / itemsPerPage);
        const prevPage = (currentPage - 1 + totalPages) % totalPages;
        const prevDisplayedItems = wardrobe_tabs
          .filter((wardrobe_tab) => wardrobe_tab.type === activeTab)
          .flatMap((wardrobe_tab) => wardrobe_tab.items)
          .slice(prevPage * itemsPerPage, (prevPage + 1) * itemsPerPage);

        if (prevDisplayedItems.length > 0) {
          setCurrentPage(prevPage);
        }
        break;
      case "next":
        const nextPage =
          (currentPage + 1) % Math.ceil(wardrobe_tabs.length / itemsPerPage);
        const displayedItems = wardrobe_tabs
          .filter((wardrobe_tab) => wardrobe_tab.type === activeTab)
          .flatMap((wardrobe_tab) => wardrobe_tab.items)
          .slice(nextPage * itemsPerPage, (nextPage + 1) * itemsPerPage);

        if (displayedItems.length > 0) {
          setCurrentPage(nextPage);
        }
        break;
      default:
        console.log(area.name);
        setActiveTab(area.name);
        setCurrentPage(0);
        break;
    }
  };

  const firstArea = MAP.areas[0];
  const left =
    Math.min(...firstArea.coords.filter((_, idx) => idx % 2 === 0)) /
    scalingFactor;
  const top =
    Math.min(...firstArea.coords.filter((_, idx) => idx % 2 === 1)) /
      scalingFactor +
    topOffset;
  const width =
    Math.max(...firstArea.coords.filter((_, idx) => idx % 2 === 0)) -
    Math.min(...firstArea.coords.filter((_, idx) => idx % 2 === 0));
  const height =
    Math.max(...firstArea.coords.filter((_, idx) => idx % 2 === 1)) -
    Math.min(...firstArea.coords.filter((_, idx) => idx % 2 === 1));

  const displayedItems = wardrobe_tabs
    .filter((wardrobe_tab) => wardrobe_tab.type === activeTab)
    .flatMap((wardrobe_tab) => wardrobe_tab.items)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="phone-container">
      <ImageMapper
        src={"/assets/phone.png"}
        map={MAP}
        onClick={(area: any) => handleAreaClick(area)}
      />
      <div
        className="item-menu"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Wardrobe_Tab
          type={activeTab as WardrobeCategory}
          items={displayedItems}
          onItemSelect={onItemSelect}
          equippedItems={character}
        />
      </div>
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
  character: Character | null;
}

export const Character: React.FC<Props_Character> = ({ character }) => {
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

export interface Props_Creation {
  startGame?: () => void;
}

const Creation: React.FC<Props_Creation> = ({ startGame }) => {
  const user = useContext(User);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [character, setCharacter] = useState<Character>({
    name: "Default",
    hair: wardrobe_tabs[0].items[0],
    eyes: null,
    torso: [wardrobe_tabs[2].items[0]],
    legs: wardrobe_tabs[3].items[0],
    feet: wardrobe_tabs[4].items[0],
    accessories: [],
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleYes = () => {
    user.setCharacter(character);
    if (startGame) startGame();
  };

  const handleNo = () => {
    setIsModalOpen(false);
  };

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
      <div className="wardrobe">
        <Phone
          onItemSelect={handleItemSelect}
          character={character}
          openModal={openModal}
        />
      </div>
      {isModalOpen && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <p>Are you sure you want to start the game?</p>
            <p>You can't change your character after you start.</p>
            <div className="modal-buttons">
              <button id="noButton" onClick={handleNo}>
                No
              </button>
              <button id="yesButton" onClick={handleYes}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creation;
