import React, { useContext, useState } from "react";
import { Editor_Type } from "../pages/Editor";
import { Story } from "../story/Interfaces";
import { Block_Chapter } from "./blocks/Chapter";
import { Block_Dialogue } from "./blocks/Dialogue";
import { Block_Scene } from "./blocks/Scene";
import Preview from "./Preview";

const Explorer: React.FC = () => {
  const editor = useContext(Editor_Type);
  const [collapsedStory, setCollapsedStory] = useState(false);
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(
    new Set()
  );
  const [collapsedScenes, setCollapsedScenes] = useState<Set<string>>(
    new Set()
  );
  const [collapsedCharacters, setCollapsedCharacters] = useState(false); // New state for Characters
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
    setContextMenu({ x: e.pageX, y: e.pageY, target });
  };

  const handleLeftClick = () => {
    setContextMenu(null);
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
      case "addCharacter":
        const characterId = prompt("Enter new character ID:");
        if (characterId) {
          editor.handleAddCharacter(characterId, {
            name: "",
            url: "",
            stats: {},
          });
        }
        break;
      case "removeChapter":
        editor.handleDeleteChapter(target.chapterId);
        break;
      case "removeScene":
        editor.handleDeleteScene(target.chapterId, target.sceneId);
        break;
      case "removeDialogue":
        editor.handleDeleteDialogue(
          target.chapterId,
          target.sceneId,
          target.dialogueId
        );
        break;
      case "removeCharacter":
        editor.handleDeleteCharacter(target.characterId);
        break;
      default:
        break;
    }
    setContextMenu(null);
  };

  return (
    <div className="file-explorer" onClick={handleLeftClick}>
      <div className="file-explorer-content">
        <div
          className={`explorer-item ${collapsedStory ? "collapsed" : ""} ${
            editor.currentChapterId.length > 0 ||
            editor.currentSceneId.length > 0 ||
            editor.currentDialogueId.length > 0
              ? "selected"
              : ""
          }`}
          onContextMenu={(e) => handleRightClick(e, {})}
        >
          <span
            className="triangle"
            onClick={() => setCollapsedStory(!collapsedStory)}
          />
          <span>Story</span>
        </div>
        {!collapsedStory &&
          Object.entries(editor.story as Story)
            .sort(([a], [b]) => {
              if (a === "start") return -1;
              if (b === "start") return 1;
              return a.localeCompare(b);
            })
            .map(([chapterId, chapter]) => (
              <div className="ide-chapter" key={chapterId}>
                <div
                  className={`explorer-item ${
                    collapsedChapters.has(chapterId) ? "collapsed" : ""
                  } ${editor.currentChapterId === chapterId ? "selected" : ""}`}
                  onContextMenu={(e) => handleRightClick(e, { chapterId })}
                  onClick={(e) => editor.handleItemClick(e, { chapterId })}
                >
                  <span
                    className="triangle"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCollapse(chapterId, true);
                    }}
                  />
                  <span>[Chapter] {chapterId}</span>
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
                          } ${
                            editor.currentSceneId === sceneId &&
                            editor.currentChapterId === chapterId
                              ? "selected"
                              : ""
                          }`}
                          onContextMenu={(e) =>
                            handleRightClick(e, { chapterId, sceneId })
                          }
                          onClick={(e) =>
                            editor.handleItemClick(e, { chapterId, sceneId })
                          }
                        >
                          <span
                            className="triangle"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCollapse(sceneId, false);
                            }}
                          />
                          <span>[Scene] {sceneId}</span>
                        </div>
                        {!collapsedScenes.has(sceneId) &&
                          Object.keys(chapter.scenes[sceneId].dialogue)
                            .sort((a, b) => {
                              if (a === "start") return -1;
                              if (b === "start") return 1;
                              return a.localeCompare(b);
                            })
                            .map((dialogueId) => (
                              <div
                                key={dialogueId}
                                style={{ paddingLeft: "40px" }}
                              >
                                <div
                                  className={`explorer-item-dialogue ${
                                    editor.currentDialogueId === dialogueId &&
                                    editor.currentSceneId === sceneId &&
                                    editor.currentChapterId === chapterId
                                      ? "selected"
                                      : ""
                                  }`}
                                  onContextMenu={(e) =>
                                    handleRightClick(e, {
                                      chapterId,
                                      sceneId,
                                      dialogueId,
                                    })
                                  }
                                  onClick={(e) =>
                                    editor.handleItemClick(e, {
                                      chapterId,
                                      sceneId,
                                      dialogueId,
                                    })
                                  }
                                >
                                  [Dialogue] {dialogueId}
                                </div>
                              </div>
                            ))}
                      </div>
                    ))}
              </div>
            ))}
        <div
          className={`explorer-item ${collapsedCharacters ? "collapsed" : ""} ${
            editor.currentCharacterId.length > 0 ? "selected" : ""
          }`}
          onContextMenu={(e) => handleRightClick(e, {})}
        >
          <span
            className="triangle"
            onClick={() => setCollapsedCharacters(!collapsedCharacters)}
          />
          <span>Characters</span>
        </div>
        {!collapsedCharacters &&
          editor.characters &&
          Object.keys(editor.characters).map((characterId) => (
            <div key={characterId} style={{ paddingLeft: "20px" }}>
              <div
                className={`explorer-item ${
                  editor.currentCharacterId === characterId ? "selected" : ""
                }`}
                onContextMenu={(e) => handleRightClick(e, { characterId })}
                onClick={(e) => editor.handleItemClick(e, { characterId })}
              >
                <span>
                  [Character]{" "}
                  {editor.characters && editor.characters[characterId].name}
                </span>
              </div>
            </div>
          ))}
        {contextMenu && (
          <div
            className="context-menu"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
            }}
          >
            {!contextMenu.target.chapterId &&
              !contextMenu.target.characterId && (
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
                  Delete Chapter
                </div>
              </>
            )}
            {contextMenu.target.sceneId && !contextMenu.target.dialogueId && (
              <>
                <div onClick={() => handleContextMenuAction("addDialogue")}>
                  Add Dialogue
                </div>
                <div onClick={() => handleContextMenuAction("removeScene")}>
                  Delete Scene
                </div>
              </>
            )}
            {contextMenu.target.dialogueId && (
              <>
                <div onClick={() => handleContextMenuAction("removeDialogue")}>
                  Delete Dialogue
                </div>
              </>
            )}
            {contextMenu.target.characterId && (
              <>
                <div onClick={() => handleContextMenuAction("removeCharacter")}>
                  Delete Character
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const EditorWindow: React.FC = () => {
  const editor = useContext(Editor_Type);

  if (editor.currentDialogueId) {
    return <Block_Dialogue />;
  }

  if (editor.currentSceneId) {
    return <Block_Scene />;
  }

  if (editor.currentChapterId) {
    return <Block_Chapter />;
  }

  if (editor.currentCharacterId) {
    //return <Block_Character />;
  }

  return <p>Select a chapter, scene, dialogue, or character to edit.</p>;
};

export const EditorLayout: React.FC = () => {
  return (
    <div className="editor-layout">
      <div className="exploring">
        <Explorer />
        <div className="editing">
          <EditorWindow />
        </div>
      </div>
      <div className="previewing">
        <Preview />
      </div>
    </div>
  );
};
