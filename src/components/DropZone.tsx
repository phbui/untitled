import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Interface_Wardrobe_Item } from "./BottomTabs";

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
  const [{ isOver }, dropRef] = useDrop({
    accept: "wardrobe-item",
    drop: () => {
      if (type === currentlyDragging?.type) {
        onDrop(type, currentlyDragging);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getDropZoneClass = (isOver: boolean) => {
    let cssClass = "drop-zone ";
    let canDrop = type === currentlyDragging?.type;

    if (canDrop && !isOver) cssClass += " correct";
    if (canDrop && isOver) cssClass += " hover";

    return cssClass;
  };

  const setDropZoneClass = () => {
    setCssClass(getDropZoneClass(isOver) + " " + type);
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
