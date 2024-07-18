import { useContext, useState } from "react";
import { Editor_Type } from "../pages/Editor";
import { Story } from "../story/Interfaces";
import { Block_Chapter } from "./blocks/Chapter";
import { Dialogue_Block } from "./blocks/Dialogue";
import { Block_Scene } from "./blocks/Scene";
import Preview from "./Preview";

const Explorer: React.FC = () => {
  const editor = useContext(Editor_Type);
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(
    new Set()
  );
  const [collapsedScenes, setCollapsedScenes] = useState<Set<string>>(
    new Set()
  );
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    target: any;
  } | null>(null);

  const toggleCollapse = (id: string, isChapter: boolean) => {
    if (isChapter) {
      const newCollapsed = new Set(collapsedChapters);
      if (newCollapsed.has(id)) {
        newCollapsed.delete(id);
      } else {
        newCollapsed.add(id);
      }
      setCollapsedChapters(newCollapsed);
    } else {
      const newCollapsed = new Set(collapsedScenes);
      if (newCollapsed.has(id)) {
        newCollapsed.delete(id);
      } else {
        newCollapsed.add(id);
      }
      setCollapsedScenes(newCollapsed);
    }
  };

  const handleRightClick = (e: React.MouseEvent, target: any) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, target });
  };

  const handleContextMenuAction = (action: string) => {
    if (!contextMenu) return;
    const { target } = contextMenu;
    switch (action) {
      case "addChapter":
        const chapterId = prompt("Enter new chapter ID:");
        if (chapterId) {
          editor.handleAddChapter(chapterId);
        }
        break;
      case "addScene":
        const sceneId = prompt("Enter new scene ID:");
        if (sceneId) {
          editor.handleAddScene(target.chapterId, sceneId);
        }
        break;
      case "addDialogue":
        const dialogueId = prompt("Enter new dialogue ID:");
        if (dialogueId) {
          editor.handleAddDialogue(
            target.chapterId,
            target.sceneId,
            dialogueId
          );
        }
        break;
      case "removeChapter":
        if (
          window.confirm(
            `Are you sure you want to remove chapter "${target.chapterId}"?`
          )
        ) {
          editor.handleRemoveChapter(target.chapterId);
        }
        break;
      case "removeScene":
        if (
          window.confirm(
            `Are you sure you want to remove scene "${target.sceneId}"?`
          )
        ) {
          editor.handleRemoveScene(target.chapterId, target.sceneId);
        }
        break;
      case "removeDialogue":
        if (
          window.confirm(
            `Are you sure you want to remove dialogue "${target.dialogueId}"?`
          )
        ) {
          editor.handleRemoveDialogue(
            target.chapterId,
            target.sceneId,
            target.dialogueId
          );
        }
        break;
      default:
        break;
    }
    setContextMenu(null);
  };

  return (
    <div className="file-explorer">
      <div
        className="explorer-item"
        onContextMenu={(e) => handleRightClick(e, {})}
      >
        Story
      </div>
      {Object.entries(editor.story as Story)
        .sort(([a], [b]) => {
          if (a === "start") return -1;
          if (b === "start") return 1;
          return a.localeCompare(b);
        })
        .map(([chapterId, chapter]) => (
          <div key={chapterId}>
            <div
              className={`explorer-item ${
                collapsedChapters.has(chapterId) ? "collapsed" : ""
              }`}
              onClick={() => toggleCollapse(chapterId, true)}
              onContextMenu={(e) => handleRightClick(e, { chapterId })}
            >
              {chapterId}
            </div>
            {!collapsedChapters.has(chapterId) &&
              Object.entries(chapter.scenes)
                .sort(([a], [b]) => {
                  if (a === "start") return -1;
                  if (b === "start") return 1;
                  return a.localeCompare(b);
                })
                .map(([sceneId]) => (
                  <div key={sceneId} style={{ paddingLeft: "20px" }}>
                    <div
                      className={`explorer-item ${
                        collapsedScenes.has(sceneId) ? "collapsed" : ""
                      }`}
                      onClick={() => toggleCollapse(sceneId, false)}
                      onContextMenu={(e) =>
                        handleRightClick(e, { chapterId, sceneId })
                      }
                    >
                      {sceneId}
                    </div>
                    {!collapsedScenes.has(sceneId) &&
                      Object.keys(chapter.scenes[sceneId].dialogue)
                        .sort((a, b) => {
                          if (a === "start") return -1;
                          if (b === "start") return 1;
                          return a.localeCompare(b);
                        })
                        .map((dialogueId) => (
                          <div key={dialogueId} style={{ paddingLeft: "40px" }}>
                            <div
                              className="explorer-item"
                              onContextMenu={(e) =>
                                handleRightClick(e, {
                                  chapterId,
                                  sceneId,
                                  dialogueId,
                                })
                              }
                            >
                              {dialogueId}
                            </div>
                          </div>
                        ))}
                  </div>
                ))}
          </div>
        ))}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {!contextMenu.target.chapterId && (
            <div onClick={() => handleContextMenuAction("addChapter")}>
              Add Chapter
            </div>
          )}
          {contextMenu.target.chapterId && !contextMenu.target.sceneId && (
            <>
              <div onClick={() => handleContextMenuAction("addScene")}>
                Add Scene
              </div>
              <div onClick={() => handleContextMenuAction("removeChapter")}>
                Remove Chapter
              </div>
            </>
          )}
          {contextMenu.target.sceneId && (
            <>
              <div onClick={() => handleContextMenuAction("addDialogue")}>
                Add Dialogue
              </div>
              <div onClick={() => handleContextMenuAction("removeScene")}>
                Remove Scene
              </div>
            </>
          )}
          {contextMenu.target.dialogueId && (
            <>
              <div onClick={() => handleContextMenuAction("removeDialogue")}>
                Remove Dialogue
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const EditorWindow: React.FC = () => {
  const editor = useContext(Editor_Type);

  if (editor.currentDialogueId) {
    return <Dialogue_Block />;
  }

  if (editor.currentSceneId) {
    return <Block_Scene />;
  }

  if (editor.currentChapterId) {
    return <Block_Chapter />;
  }

  return <p>Select a chapter, scene, or dialogue to edit.</p>;
};

export const EditorLayout: React.FC = () => {
  return (
    <div className="editor-layout">
      <Explorer />
      <EditorWindow />
      <Preview />
    </div>
  );
};
