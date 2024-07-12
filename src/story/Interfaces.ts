export interface Dialogue_Next {
  dialogue_id?: string;
  dialog_options?: Dialogue_Option[];
  scene_id?: string;
  chapter_id?: string;
}

export interface Dialogue_Option {
  text: string;
  next: Dialogue_Next;
}

export interface Dialogue {
  character_id: string;
  text: string;
  next: Dialogue_Next;
}

export interface Dialogues {
  [key: string]: Dialogue;
}

export interface Scene {
  name: string;
  background: string;
  dialogue: Dialogues;
}

export interface Scenes {
  [key: string]: Scene;
}

export interface Chapter {
  name: string;
  scenes: Scenes;
}

export interface Story {
  [key: string]: Chapter;
}
