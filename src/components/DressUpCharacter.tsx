import React from "react";
import DropZone from "./DropZone";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_DressUpCharacter {
  clothingItems: { [key: string]: Interface_Wardrobe_Item };
  currentlyDragging: Interface_Wardrobe_Item | undefined;
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

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
      <DropZone
        type="hat"
        item={clothingItems.hat}
        currentlyDragging={currentlyDragging}
        onDrop={onDrop}
      />
      <DropZone
        type="accessories"
        item={clothingItems.accessories}
        currentlyDragging={currentlyDragging}
        onDrop={onDrop}
      />
      <DropZone
        type="shirt"
        item={clothingItems.shirt}
        currentlyDragging={currentlyDragging}
        onDrop={onDrop}
      />
      <DropZone
        type="jacket"
        item={clothingItems.jacket}
        currentlyDragging={currentlyDragging}
        onDrop={onDrop}
      />
      <DropZone
        type="pants"
        item={clothingItems.pants}
        currentlyDragging={currentlyDragging}
        onDrop={onDrop}
      />
      <DropZone
        type="shoes"
        item={clothingItems.shoes}
        currentlyDragging={currentlyDragging}
        onDrop={onDrop}
      />
    </div>
  );
};

export default DressUpCharacter;
