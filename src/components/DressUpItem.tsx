import React from "react";
import { useDrag } from "react-dnd";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

const DressUpItem: React.FC<{ item: Interface_Wardrobe_Item }> = ({ item }) => {
  const [, dragRef] = useDrag({
    type: "wardrobe-item",
    item: { name: item.key },
  });

  return (
    <div ref={dragRef} className="wardrobe-item">
      <img src={item.asset_url} alt={item.description} />
      <p>{item.description}</p>
    </div>
  );
};

export default DressUpItem;
