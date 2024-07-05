import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_DropZone {
  type: string;
  item: Interface_Wardrobe_Item | null;
  currentlyDragging: Interface_Wardrobe_Item | undefined;
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const DropZone: React.FC<Props_DropZone> = ({
  type,
  item,
  currentlyDragging,
  onDrop,
}) => {
  const [cssClass, setCssClass] = useState<string>("drop-zone " + type);
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "wardrobe-item",
    drop: (droppedItem: Interface_Wardrobe_Item) => {
      if (type === droppedItem.type) {
        onDrop(type, droppedItem);
      }
    },
    canDrop: () => type === currentlyDragging?.type,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getDropZoneClass = (isOver: boolean, canDrop: boolean) => {
    return isOver && canDrop ? "drop-zone hover" : "drop-zone";
  };

  const setDropZoneClass = () => {
    setCssClass(getDropZoneClass(isOver, canDrop) + " " + type);
  };

  useEffect(() => {
    setDropZoneClass();
  }, [isOver, currentlyDragging]);

  return (
    <div ref={dropRef} className={cssClass}>
      {item && (
        <img src={item.asset_url} alt={type} className={`clothing ${type}`} />
      )}
    </div>
  );
};

export default DropZone;
