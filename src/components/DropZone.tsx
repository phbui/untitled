import React from "react";
import { useDrop } from "react-dnd";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_DropZone {
  type: string;
  item: Interface_Wardrobe_Item | null;
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const DropZone: React.FC<Props_DropZone> = ({ type, item, onDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "wardrobe-item",
    drop: (droppedItem: Interface_Wardrobe_Item) => {
      onDrop(droppedItem.type, droppedItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getDropZoneClass = (isOver: boolean) => {
    return isOver ? "drop-zone hover" : "drop-zone";
  };

  return (
    <div ref={dropRef} className={getDropZoneClass(isOver) + " " + type}>
      {item && (
        <img src={item.asset_url} alt={type} className={`clothing ${type}`} />
      )}
    </div>
  );
};

export default DropZone;
