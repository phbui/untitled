import { Chapter, Dialogues, Scenes, Story } from "./Interfaces";

const start_dialogues: Dialogues = {
  start: {
    character_name: "Anon",
    character_id: "Anon",
    text: "Today's going to be my first day at Untitled High, I can't wait :)",
    next: { dialoge_id: "start_1" },
  },
  start_1: {
    character_name: "Mom",
    character_id: "mom",
    text: "Good morning! Did you sleep well?",
    next: {
      dialog_options: [
        { text: "Yes, I did!", next: { dialoge_id: "start_2" } },
        { text: "No, not really.", next: { dialoge_id: "start_3" } },
      ],
    },
  },
  start_2: {
    character_name: "Mom",
    character_id: "mom",
    text: "That's good to hear! Let's have breakfast.",
    next: { dialoge_id: "start_4" },
  },
  start_3: {
    character_name: "Mom",
    character_id: "mom",
    text: "I'm sorry to hear that. Maybe a good breakfast will help.",
    next: { dialoge_id: "start_4" },
  },
  start_4: {
    character_name: "Mom",
    character_id: "mom",
    text: "What would you like to eat?",
    next: {
      dialog_options: [
        { text: "Pancakes", next: { dialoge_id: "start_5" } },
        { text: "Eggs and bacon", next: { dialoge_id: "start_6" } },
      ],
    },
  },
  start_5: {
    character_name: "Mom",
    character_id: "mom",
    text: "Pancakes it is! I'll get them ready.",
    next: {
      scene_id: "jeff_encounter",
      dialoge_id: "start",
      chapter_id: "chapter1",
    },
  },
  start_6: {
    character_name: "Mom",
    character_id: "mom",
    text: "Eggs and bacon coming right up!",
    next: {
      scene_id: "jeff_encounter",
      dialoge_id: "start",
      chapter_id: "chapter1",
    },
  },
};

const jeff_encounter_dialogues: Dialogues = {
  start: {
    character_name: "unknown...",
    character_id: "jeff",
    text: "Hold up!",
    next: { dialoge_id: "encounter_jeff_1" },
  },
  encounter_jeff_1: {
    character_name: "Jeff",
    character_id: "jeff",
    text: "Hey there! Long time no see.",
    next: {
      dialog_options: [
        {
          text: "Hi Jeff! How have you been?",
          next: { dialoge_id: "encounter_jeff_2" },
        },
        { text: "Oh, hi...", next: { dialoge_id: "encounter_jeff_3" } },
      ],
    },
  },
  encounter_jeff_2: {
    character_name: "Jeff",
    character_id: "jeff",
    text: "I've been great, thanks for asking! How about you?",
    next: { dialoge_id: "encounter_jeff_4" },
  },
  encounter_jeff_3: {
    character_name: "Jeff",
    character_id: "jeff",
    text: "You seem a bit off. Is everything okay?",
    next: { dialoge_id: "encounter_jeff_4" },
  },
  encounter_jeff_4: {
    character_name: "Narrator",
    character_id: "narrator",
    text: "You and Jeff chat for a while before heading to class.",
    next: {
      scene_id: "classroom",
      dialoge_id: "start",
      chapter_id: "chapter1",
    },
  },
};

const classroom_dialogues: Dialogues = {
  start: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "Settle down, y'all",
    next: { dialoge_id: "school_intro_1" },
  },
  school_intro_1: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "Welcome to the first day of school, everyone!",
    next: {
      dialog_options: [
        {
          text: "Listen attentively",
          next: { dialoge_id: "school_intro_2" },
        },
        { text: "Daydream", next: { dialoge_id: "school_intro_3" } },
      ],
    },
  },
  school_intro_2: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "I'm glad you're all here and ready to learn.",
    next: { dialoge_id: "school_intro_4" },
  },
  school_intro_3: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "Please pay attention, this is important.",
    next: { dialoge_id: "school_intro_4" },
  },
  school_intro_4: {
    character_name: "Narrator",
    character_id: "narrator",
    text: "The first day of school continues with various introductions.",
    next: {},
  },
};

const day_one_scenes: Scenes = {
  start: {
    name: "start",
    background: "",
    dialogue: start_dialogues,
  },
  jeff_encounter: {
    name: "encounter_jeff",
    background: "",
    dialogue: jeff_encounter_dialogues,
  },
  classroom: {
    name: "school_intro",
    background: "",
    dialogue: classroom_dialogues,
  },
};

const day_one: Chapter = {
  name: "Day One",
  scenes: day_one_scenes,
};

export const story: Story = {
  start: day_one,
};
