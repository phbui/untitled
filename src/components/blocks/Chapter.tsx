import { useContext, useState } from "react";
import { Chapter } from "../../story/Interfaces";
import { Block_Scene } from "./Scene";
import { Editor_Type } from "../../pages/Editor";

export const Block_Chapter: React.FC<{
  chapterId: string;
  chapter: Chapter;
}> = ({ chapterId, chapter }) => {
  const editor = useContext(Editor_Type);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddScene = () => {
    const sceneId = prompt("Enter new scene ID:");
    if (sceneId) {
      editor.handleAddScene(chapterId, sceneId);
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (!isCollapsed) e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    editor.handleItemClick(e, { chapterId });
  };

  return (
    <div className="block-chapter" onClick={handleBlockClick}>
      <h2 onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
        {chapterId}
      </h2>
      {!isCollapsed && (
        <div>
          {Object.entries(chapter.scenes)
            .sort(([a], [b]) => {
              if (a === "start") return -1;
              if (b === "start") return 1;
              return a.localeCompare(b);
            })
            .map(([sceneId, scene]) => (
              <Block_Scene
                key={sceneId}
                chapterId={chapterId}
                sceneId={sceneId}
                scene={scene}
              />
            ))}
          <button onClick={handleAddScene}>Add Scene</button>
        </div>
      )}
    </div>
  );
};
