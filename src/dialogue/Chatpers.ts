import { Chapter, Scene } from "./Interfaces";

export const chapter1_scenes: Scene[] = [
  {
    name: "breakfast",
    background: "",
    dialogue: {
      start: {
        characterName: "Anon",
        characterId: "Anon",
        text: "Today's going to be my first day at Untitled High, I can't wait :)",
        nextId: "breakfast_1",
      },
      breakfast_1: {
        characterName: "Mom",
        characterId: "mom",
        text: "Good morning! Did you sleep well?",
        options: [
          { text: "Yes, I did!", nextId: "breakfast_2" },
          { text: "No, not really.", nextId: "breakfast_3" },
        ],
      },
      breakfast_2: {
        characterName: "Mom",
        characterId: "mom",
        text: "That's good to hear! Let's have breakfast.",
        nextId: "breakfast_4",
      },
      breakfast_3: {
        characterName: "Mom",
        characterId: "mom",
        text: "I'm sorry to hear that. Maybe a good breakfast will help.",
        nextId: "breakfast_4",
      },
      breakfast_4: {
        characterName: "Mom",
        characterId: "mom",
        text: "What would you like to eat?",
        options: [
          { text: "Pancakes", nextId: "breakfast_5" },
          { text: "Eggs and bacon", nextId: "breakfast_6" },
        ],
      },
      breakfast_5: {
        characterName: "Mom",
        characterId: "mom",
        text: "Pancakes it is! I'll get them ready.",
        nextId: "breakfast_end",
      },
      breakfast_6: {
        characterName: "Mom",
        characterId: "mom",
        text: "Eggs and bacon coming right up!",
        nextId: "breakfast_end",
      },
      breakfast_end: {
        characterName: "Narrator",
        characterId: "narrator",
        text: "You enjoyed a lovely breakfast with your mom.",
        end: true,
      },
    },
  },
  {
    name: "encounter_jeff",
    background: "",
    dialogue: {
      encounter_jeff_1: {
        characterName: "Jeff",
        characterId: "jeff",
        text: "Hey there! Long time no see.",
        options: [
          { text: "Hi Jeff! How have you been?", nextId: "encounter_jeff_2" },
          { text: "Oh, hi...", nextId: "encounter_jeff_3" },
        ],
      },
      encounter_jeff_2: {
        characterName: "Jeff",
        characterId: "jeff",
        text: "I've been great, thanks for asking! How about you?",
        nextId: "encounter_jeff_4",
      },
      encounter_jeff_3: {
        characterName: "Jeff",
        characterId: "jeff",
        text: "You seem a bit off. Is everything okay?",
        nextId: "encounter_jeff_4",
      },
      encounter_jeff_4: {
        characterName: "Narrator",
        characterId: "narrator",
        text: "You and Jeff chat for a while before heading to class.",
        end: true,
      },
    },
  },
  {
    name: "school_intro",
    background: "",
    dialogue: {
      school_intro_1: {
        characterName: "Teacher",
        characterId: "teacher",
        text: "Welcome to the first day of school, everyone!",
        options: [
          { text: "Listen attentively", nextId: "school_intro_2" },
          { text: "Daydream", nextId: "school_intro_3" },
        ],
      },
      school_intro_2: {
        characterName: "Teacher",
        characterId: "teacher",
        text: "I'm glad you're all here and ready to learn.",
        nextId: "school_intro_4",
      },
      school_intro_3: {
        characterName: "Teacher",
        characterId: "teacher",
        text: "Please pay attention, this is important.",
        nextId: "school_intro_4",
      },
      school_intro_4: {
        characterName: "Narrator",
        characterId: "narrator",
        text: "The first day of school continues with various introductions.",
        end: true,
      },
    },
  },
];

export const chapter1: Chapter = {
  name: "Day One",
  scenes: chapter1_scenes,
};

export const story: Chapter[] = [chapter1];
