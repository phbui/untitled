export interface Dialogue_Option {
  text: string;
  nextId: string;
}

export interface Dialogue {
  id: string;
  characterName: string;
  characterId: string;
  text: string;
  nextId?: string;
  options?: Dialogue_Option[];
  end?: boolean;
}

export interface Scene {
  name: string;
  background: string;
  dialogue: { [key: string]: Dialogue };
}

export interface Chapter {
  name: string;
  scenes: Scene[];
}
