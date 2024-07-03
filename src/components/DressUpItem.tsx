import React from "react";
import { useDrag } from "react-dnd";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_DressUpItem {
  item: Interface_Wardrobe_Item;
  onDrop: () => void;
}

const DressUpItem: React.FC<Props_DressUpItem> = ({ item, onDrop }) => {
  const [, dragRef] = useDrag({
    type: "wardrobe-item",
    item: { name: item.key },
    end: onDrop,
  });

  return (
    <div ref={dragRef} className="wardrobe-item">
      <img src={item.asset_url} alt={item.description} />
      <p>{item.description}</p>
    </div>
  );
};

export default DressUpItem;
