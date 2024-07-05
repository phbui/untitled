import React from "react";
import DropZone from "./DropZone";
import { Interface_Wardrobe_Item } from "./BottomTabs";

interface Props_DressUpCharacter {
  clothingItems: { [key: string]: Interface_Wardrobe_Item };
  currentlyDragging: Interface_Wardrobe_Item | undefined;
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const clothingTypes = [
  "hat",
  "accessories",
  "shirt",
  "jacket",
  "pants",
  "shoes",
];

const DressUpCharacter: React.FC<Props_DressUpCharacter> = ({
  currentlyDragging,
  clothingItems,
  onDrop,
}) => {
  return (
    <div className="character">
      <img
        src="path/to/base/character.png"
        alt="Base Character"
        className="base-character"
      />
      {clothingTypes.map((type) => (
        <DropZone
          key={type}
          type={type}
          item={clothingItems[type]}
          currentlyDragging={currentlyDragging}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default DressUpCharacter;
