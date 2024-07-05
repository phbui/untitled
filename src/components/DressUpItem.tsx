import React from "react";
import { useDrag } from "react-dnd";
import { Interface_Wardrobe_Item } from "./BottomTabs";

interface Props_DressUpItem {
  item: Interface_Wardrobe_Item;
  startDrag: () => void;
  onDrop: () => void;
}

const DressUpItem: React.FC<Props_DressUpItem> = ({
  item,
  startDrag,
  onDrop,
}) => {
  const [, dragRef] = useDrag({
    type: "wardrobe-item",
    item: { name: item.key },
    end: onDrop,
  });

  return (
    <div ref={dragRef} className="wardrobe-item" onDrag={startDrag}>
      <img src={item.asset_url} alt={item.description} />
      <p>{item.description}</p>
    </div>
  );
};

export default DressUpItem;
