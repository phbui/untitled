import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface DressUpCharacterProps {
  clothingItems: { [key: string]: string };
  onDrop: (type: string, item: Interface_Wardrobe_Item) => void;
}

const DressUpCharacter: React.FC<DressUpCharacterProps> = ({
  clothingItems,
  onDrop,
}) => {
  const createDropHandler = useCallback(
    (type: string) =>
      useDrop({
        accept: "wardrobe-item",
        drop: (item: Interface_Wardrobe_Item) => onDrop(type, item),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }),
    [onDrop]
  );

  const [{ isOver: isOverHat }, hatDropRef] = createDropHandler("hat");
  const [{ isOver: isOverAccessories }, accessoriesDropRef] =
    createDropHandler("accessories");
  const [{ isOver: isOverShirt }, shirtDropRef] = createDropHandler("shirt");
  const [{ isOver: isOverJacket }, jacketDropRef] = createDropHandler("jacket");
  const [{ isOver: isOverPants }, pantsDropRef] = createDropHandler("pants");
  const [{ isOver: isOverShoes }, shoesDropRef] = createDropHandler("shoes");

  return (
    <div className="character">
      <img
        src="path/to/base/character.png"
        alt="Base Character"
        className="base-character"
      />
      <div
        ref={hatDropRef}
        className={`drop-zone hat ${isOverHat ? "hover" : ""}`}
      >
        {clothingItems.hat && (
          <img src={clothingItems.hat} alt="hat" className="clothing hat" />
        )}
      </div>
      <div
        ref={accessoriesDropRef}
        className={`drop-zone accessories ${isOverAccessories ? "hover" : ""}`}
      >
        {clothingItems.accessories && (
          <img
            src={clothingItems.accessories}
            alt="accessories"
            className="clothing accessories"
          />
        )}
      </div>
      <div
        ref={shirtDropRef}
        className={`drop-zone shirt ${isOverShirt ? "hover" : ""}`}
      >
        {clothingItems.shirt && (
          <img
            src={clothingItems.shirt}
            alt="shirt"
            className="clothing shirt"
          />
        )}
      </div>
      <div
        ref={jacketDropRef}
        className={`drop-zone jacket ${isOverJacket ? "hover" : ""}`}
      >
        {clothingItems.jacket && (
          <img
            src={clothingItems.jacket}
            alt="jacket"
            className="clothing jacket"
          />
        )}
      </div>
      <div
        ref={pantsDropRef}
        className={`drop-zone pants ${isOverPants ? "hover" : ""}`}
      >
        {clothingItems.pants && (
          <img
            src={clothingItems.pants}
            alt="pants"
            className="clothing pants"
          />
        )}
      </div>
      <div
        ref={shoesDropRef}
        className={`drop-zone shoes ${isOverShoes ? "hover" : ""}`}
      >
        {clothingItems.shoes && (
          <img
            src={clothingItems.shoes}
            alt="shoes"
            className="clothing shoes"
          />
        )}
      </div>
    </div>
  );
};

export default DressUpCharacter;
