import React from "react";
import { Interface_Wardrobe_Item } from "./BottomTabs";

interface Props_DressUpItem {
  item: Interface_Wardrobe_Item;
  startDrag: () => void;
  onDrop: () => void;
  selected: boolean;
}

const DressUpItem: React.FC<Props_DressUpItem> = ({
  item,
  startDrag,
  onDrop,
  selected,
}) => {
  return (
    <div
      className={`wardrobe-item ${selected ? "selected" : ""}`}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onDrop={onDrop}
    >
      <img src={item.asset_url} alt={item.description} />
      <p>{item.description}</p>
    </div>
  );
};

export default DressUpItem;
