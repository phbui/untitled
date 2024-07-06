import React from "react";
import { Interface_Wardrobe_Item } from "./BottomTabs";
import { useDrag } from "react-dnd";

interface Props_DressUpItem {
  item: Interface_Wardrobe_Item;
  startDrag: () => void;
  onUp: () => void;
  onDrop: () => void;
  selected: boolean;
}

const DressUpItem: React.FC<Props_DressUpItem> = ({
  item,
  startDrag,
  onUp,
  onDrop,
  selected,
}) => {
  const [, dragRef] = useDrag({
    type: "wardrobe-item",
    item: { name: item.key },
    end: onDrop,
  });

  return (
    <div
      ref={dragRef}
      className={`wardrobe-item ${selected ? "selected" : ""}`}
      onMouseDown={startDrag}
      onMouseUp={onUp}
      onTouchStart={startDrag}
      onDrop={onDrop}
    >
      <img src={item.asset_url} alt={item.description} />
      <p>{item.description}</p>
    </div>
  );
};

export default DressUpItem;
