export interface Game_Character_Stats {}

export interface Game_Character {
  name: string;
  url: string;
  stats: Game_Character_Stats;
}

export interface Character_Repository {
  [key: string]: Game_Character;
}

export const characters: Character_Repository = {
  john_untitled: {
    name: "John Untitled",
    url: "/assets/character/dude.png",
    stats: {},
  },
  mom: {
    name: "Mom",
    url: "/assets/characters/mom.png",
    stats: {},
  },
};
