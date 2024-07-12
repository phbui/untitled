import { Chapter, Dialogues, Scenes, Story } from "./Interfaces";

const start_dialogues: Dialogues = {
  start: {
    character_name: "Anon",
    character_id: "Anon",
    text: "...",
    next: { dialogue_id: "start_1" },
  },
  start_1: {
    character_name: "Mom",
    character_id: "mom",
    text: "Good morning! Did you sleep well?",
    next: {
      dialog_options: [
        { text: "Yes, I did!", next: { dialogue_id: "start_2" } },
        { text: "No, not really.", next: { dialogue_id: "start_3" } },
        { text: "Sure.", next: { dialogue_id: "start_2" } },
        { text: "Frick yeah!", next: { dialogue_id: "start_2" } },
      ],
    },
  },
  start_2: {
    character_name: "Mom",
    character_id: "mom",
    text: "That's good to hear! Let's have breakfast.",
    next: { dialogue_id: "start_4" },
  },
  start_3: {
    character_name: "Mom",
    character_id: "mom",
    text: "I'm sorry to hear that. Maybe a good breakfast will help.",
    next: { dialogue_id: "start_4" },
  },
  start_4: {
    character_name: "Mom",
    character_id: "mom",
    text: "What would you like to eat?",
    next: {
      dialog_options: [
        { text: "Pancakes", next: { dialogue_id: "start_5" } },
        { text: "Eggs and bacon", next: { dialogue_id: "start_6" } },
      ],
    },
  },
  start_5: {
    character_name: "Mom",
    character_id: "mom",
    text: "Pancakes it is! I'll get them ready.",
    next: {
      scene_id: "jeff_encounter",
      dialogue_id: "start",
    },
  },
  start_6: {
    character_name: "Mom",
    character_id: "mom",
    text: "Eggs and bacon coming right up!",
    next: {
      scene_id: "jeff_encounter",
      dialogue_id: "start",
    },
  },
};

const jeff_encounter_dialogues: Dialogues = {
  start: {
    character_name: "unknown...",
    character_id: "jeff",
    text: "Hold up!",
    next: { dialogue_id: "encounter_jeff_1" },
  },
  encounter_jeff_1: {
    character_name: "Jeff",
    character_id: "jeff",
    text: "Hey there! Long time no see.",
    next: {
      dialog_options: [
        {
          text: "Hi Jeff! How have you been?",
          next: { dialogue_id: "encounter_jeff_2" },
        },
        { text: "Oh, hi...", next: { dialogue_id: "encounter_jeff_3" } },
      ],
    },
  },
  encounter_jeff_2: {
    character_name: "Jeff",
    character_id: "jeff",
    text: "I've been great, thanks for asking! How about you?",
    next: { dialogue_id: "encounter_jeff_4" },
  },
  encounter_jeff_3: {
    character_name: "Jeff",
    character_id: "jeff",
    text: "You seem a bit off. Is everything okay?",
    next: { dialogue_id: "encounter_jeff_4" },
  },
  encounter_jeff_4: {
    character_name: "Narrator",
    character_id: "narrator",
    text: "You and Jeff chat for a while before heading to class.",
    next: {
      scene_id: "classroom",
      dialogue_id: "start",
    },
  },
};

const classroom_dialogues: Dialogues = {
  start: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "Settle down, y'all",
    next: { dialogue_id: "school_intro_1" },
  },
  school_intro_1: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "Welcome to the first day of school, everyone!",
    next: {
      dialog_options: [
        {
          text: "Listen attentively",
          next: { dialogue_id: "school_intro_2" },
        },
        { text: "Daydream", next: { dialogue_id: "school_intro_3" } },
      ],
    },
  },
  school_intro_2: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "I'm glad you're all here and ready to learn.",
    next: { dialogue_id: "school_intro_4" },
  },
  school_intro_3: {
    character_name: "Teacher",
    character_id: "teacher",
    text: "Please pay attention, this is important.",
    next: { dialogue_id: "school_intro_4" },
  },
  school_intro_4: {
    character_name: "Narrator",
    character_id: "narrator",
    text: "The first day of school continues with various introductions.",
    next: { chapter_id: "test", scene_id: "test", dialogue_id: "test" },
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

const test_dialogues: Dialogues = {
  test: {
    character_name: "Anon",
    character_id: "Anon",
    text: "Test",
    next: {},
  },
};

const day_two_scenes = {
  test: {
    name: "test",
    background: "",
    dialogue: test_dialogues,
  },
};

const day_two: Chapter = {
  name: "Day Two",
  scenes: day_two_scenes,
};

export const story: Story = {
  start: day_one,
  test: day_two,
};
