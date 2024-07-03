import React, { useState } from "react";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";
import { useDrop } from "react-dnd";

interface Props_DressUpCharacterPart {
  type: string;
  item: Interface_Wardrobe_Item | null;
  onDrop: (item: Interface_Wardrobe_Item) => void;
}

const DressUpCharacterPart: React.FC<Props_DressUpCharacterPart> = ({
  type,
  item,
  onDrop,
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "wardrobe-item",
    drop: (draggedItem: Interface_Wardrobe_Item) => onDrop(draggedItem),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      data-type={type}
      className={`${type} ${isOver ? "highlight" : ""}`}
    >
      {item && <img src={item.asset_url} alt={item.key} />}
    </div>
  );
};

const DressUpCharacter: React.FC = () => {
  const [items, setItems] = useState({
    hat: null as Interface_Wardrobe_Item | null,
    accessories: null as Interface_Wardrobe_Item | null,
    shirt: null as Interface_Wardrobe_Item | null,
    jacket: null as Interface_Wardrobe_Item | null,
    pants: null as Interface_Wardrobe_Item | null,
    shoes: null as Interface_Wardrobe_Item | null,
  });

  const handleDrop = (
    type: keyof typeof items,
    item: Interface_Wardrobe_Item
  ) => {
    setItems((prevItems) => ({
      ...prevItems,
      [type]: item,
    }));
  };

  return (
    <div className="character">
      <DressUpCharacterPart
        type="hat"
        item={items.hat}
        onDrop={(item) => handleDrop("hat", item)}
      />
      <DressUpCharacterPart
        type="accessories"
        item={items.accessories}
        onDrop={(item) => handleDrop("accessories", item)}
      />
      <DressUpCharacterPart
        type="accessories"
        item={items.accessories}
        onDrop={(item) => handleDrop("accessories", item)}
      />
      <DressUpCharacterPart
        type="shirt"
        item={items.shirt}
        onDrop={(item) => handleDrop("shirt", item)}
      />
      <DressUpCharacterPart
        type="jacket"
        item={items.jacket}
        onDrop={(item) => handleDrop("jacket", item)}
      />
      <DressUpCharacterPart
        type="pants"
        item={items.pants}
        onDrop={(item) => handleDrop("pants", item)}
      />
      <DressUpCharacterPart
        type="shoes"
        item={items.shoes}
        onDrop={(item) => handleDrop("shoes", item)}
      />
    </div>
  );
};

export default DressUpCharacter;
