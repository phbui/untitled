import React from "react";
import DropZone from "./DropZone";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_DressUpCharacter {
  clothingItems: { [key: string]: Interface_Wardrobe_Item };
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const DressUpCharacter: React.FC<Props_DressUpCharacter> = ({
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
      <DropZone type="hat" item={clothingItems.hat} onDrop={onDrop} />
      <DropZone
        type="accessories"
        item={clothingItems.accessories}
        onDrop={onDrop}
      />
      <DropZone type="shirt" item={clothingItems.shirt} onDrop={onDrop} />
      <DropZone type="jacket" item={clothingItems.jacket} onDrop={onDrop} />
      <DropZone type="pants" item={clothingItems.pants} onDrop={onDrop} />
      <DropZone type="shoes" item={clothingItems.shoes} onDrop={onDrop} />
    </div>
  );
};

export default DressUpCharacter;
